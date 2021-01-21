import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Discount } from '../models/discount.model';
import { Favorite } from '../models/favorite.model';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { LowestCategory } from '../models/lowest-category.model';
import { MainDiscount } from '../models/main-discount.model';
import { MediumCategory } from '../models/medium-category.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase
  ) {}

  postUser(user: User): void {
    this.database.list('users').push(user);
  }

  getUser(email: string): Promise<User[]> {
    return this.database
      .list<User>('users', (query) => {
        return query.orderByChild('email').equalTo(email).limitToFirst(1);
      })
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  postFavoriteProduct(favorite: Favorite): void {
    const ref = this.database.list('favorites').push(favorite);
    favorite.key = ref.key;
  }

  removeFavoriteProduct(favorite: Favorite): Promise<void> {
    if (favorite.key) {
      return this.database.list(`favorites/${favorite.key}`).remove();
    }
  }

  getFavoriteProducts(userEmail: string): Promise<Favorite[]> {
    return this.database
      .list<Favorite>('favorites', (query) =>
        query.orderByChild('userEmail').equalTo(userEmail)
      )
      .snapshotChanges()
      .pipe<Favorite[]>(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        })
      )
      .pipe(take(1))
      .toPromise();
  }

  postOrder(order: Order): void {
    const orderRef = this.database.database.ref(`orders`);
    const ref = orderRef.push(order);
    order.key = ref.key;
  }

  updateOrder(order: Order): void {
    if (order.key) {
      const orderRef = this.database.database.ref(`orders`);
      orderRef.child(order.key).update({ count: order.count });
    }
  }

  removeOrder(order: Order): Promise<void> {
    if (order.key) {
      return this.database.list(`orders/${order.key}`).remove();
    }
  }

  getOrders(userEmail: string): Promise<Order[]> {
    return this.database
      .list<Order>('orders', (query) =>
        query.orderByChild('userEmail').equalTo(userEmail)
      )
      .snapshotChanges()
      .pipe<Order[]>(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        })
      )
      .pipe(take(1))
      .toPromise();
  }

  getMainDiscounts(): Promise<MainDiscount[]> {
    return this.database
      .list<MainDiscount>('main-discounts')
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  getMainDiscountPictureUrl(mainDiscount: MainDiscount): Promise<string> {
    return this.storage
      .ref(mainDiscount.storagePath)
      .getDownloadURL()
      .toPromise();
  }

  async getProductPictureUrls(product: Product): Promise<string[]> {
    const promises: Promise<string>[] = [];

    try {
      for (let i = 0; i < product.picturesCount; i++) {
        promises.push(
          await this.storage
            .ref(product.picturesPath + `${i + 1}.png`)
            .getDownloadURL()
            .toPromise()
        );
      }
    } catch {}

    return Promise.all(promises);
  }

  getPictureUrl(path: string): Promise<string> {
    return this.storage.ref(path).getDownloadURL().toPromise();
  }

  async getDiscountPictureUrl(picturePath: string): Promise<string> {
    return await this.storage.ref(picturePath).getDownloadURL().toPromise();
  }

  getHighCategories(): Observable<HighCategory[]> {
    return this.database.list<HighCategory>('high-categories').valueChanges();
  }

  getMediumCategories(): Observable<MediumCategory[]> {
    return this.database
      .list<MediumCategory>('medium-categories')
      .valueChanges();
  }

  getLowCategories(): Observable<LowCategory[]> {
    return this.database.list<LowCategory>('low-categories').valueChanges();
  }

  getLowestCategories(): Observable<LowestCategory[]> {
    return this.database
      .list<LowestCategory>('lowest-categories')
      .valueChanges();
  }

  getProducts(lowestCategoryRoute: string): Observable<Product[]> {
    return this.database
      .list<Product>('products', (query) => {
        return query
          .orderByChild('lowestCategoryRoute')
          .equalTo(lowestCategoryRoute);
      })
      .valueChanges();
  }

  async getProduct(productId: string): Promise<Product[]> {
    return this.database
      .list<Product>('products', (query) => {
        return query.orderByChild('id').equalTo(productId).limitToFirst(1);
      })
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  async getDiscounts(): Promise<Discount[]> {
    return await this.database
      .list<Discount>('discounts')
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  async getFullRoute(lowestCategoryRoute: string): Promise<string> {
    try {
      const lowestCategories: LowestCategory[] = await this.database
        .list<LowestCategory>('lowest-categories', (query) => {
          return query
            .orderByChild('route')
            .equalTo(lowestCategoryRoute)
            .limitToFirst(1);
        })
        .valueChanges()
        .pipe(take(1))
        .toPromise();

      if (lowestCategories?.length) {
        const lowCategories: LowCategory[] = await this.database
          .list<LowCategory>('low-categories', (query) => {
            return query
              .orderByChild('route')
              .equalTo(lowestCategories[0].lowCategoryRoute)
              .limitToFirst(1);
          })
          .valueChanges()
          .pipe(take(1))
          .toPromise();

        if (lowCategories?.length) {
          const mediumCategories: MediumCategory[] = await this.database
            .list<MediumCategory>('medium-categories', (query) => {
              return query
                .orderByChild('route')
                .equalTo(lowCategories[0].mediumCategoryRoute)
                .limitToFirst(1);
            })
            .valueChanges()
            .pipe(take(1))
            .toPromise();

          if (mediumCategories?.length) {
            const highCategories: HighCategory[] = await this.database
              .list<HighCategory>('high-categories', (query) => {
                return query
                  .orderByChild('route')
                  .equalTo(mediumCategories[0].highCategoryRoute)
                  .limitToFirst(1);
              })
              .valueChanges()
              .pipe(take(1))
              .toPromise();
            return Promise.resolve(
              `${highCategories[0].route}/${mediumCategories[0].route}/${lowCategories[0].route}/${lowestCategories[0].route}`
            );
          }
        }
      }
    } catch {
      console.log(`There is no route for \'${lowestCategoryRoute}\'`);
    }

    return Promise.reject();
  }

  clear() {
    this.database.object('high-categories').remove();
    this.database.object('medium-categories').remove();
    this.database.object('low-categories').remove();
    this.database.object('lowest-categories').remove();
    this.database.object('products').remove();
    this.database.object('discounts').remove();
    this.database.object('main-discounts').remove();
  }
}
