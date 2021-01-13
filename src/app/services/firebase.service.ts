import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Discount } from '../models/discount.model';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { LowestCategory } from '../models/lowest-category.model';
import { MainDiscount } from '../models/main-discount.model';
import { MediumCategory } from '../models/medium-category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase
  ) {}

  getMainDiscountUrls() {
    return new Promise<string[]>((resolve) => {
      this.database
        .list<MainDiscount>('main-discounts')
        .valueChanges()
        .subscribe((discounts) => {
          const urls = [];
          discounts.forEach((discount) => {
            this.storage
              .ref(discount.storagePath)
              .getDownloadURL()
              .subscribe((url) => {
                urls.push(url);
                resolve(urls);
              });
          });
        });
    });
  }

  async getProductPictureUrls(product: Product) {
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

  getHighCategories(): Observable<HighCategory[]> {
    return this.database.list<HighCategory>('high-categories').valueChanges();
  }

  getMediumCategories(highCategoryRoute: string): Observable<MediumCategory[]> {
    return this.database
      .list<MediumCategory>('medium-categories', (query) =>
        query.orderByChild('highCategoryRoute').equalTo(highCategoryRoute)
      )
      .valueChanges();
  }

  getLowCategories(mediumCategoryRoute: string): Observable<LowCategory[]> {
    return this.database
      .list<LowCategory>('low-categories', (query) =>
        query.orderByChild('mediumCategoryRoute').equalTo(mediumCategoryRoute)
      )
      .valueChanges();
  }

  getLowestCategories(lowCategoryRoute: string): Observable<LowestCategory[]> {
    return this.database
      .list<LowestCategory>('lowest-categories', (query) => {
        return query.orderByChild('lowCategoryRoute').equalTo(lowCategoryRoute);
      })
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

  async getDiscountProducts(): Promise<Product[]> {
    const discounts: Discount[] = await this.database
      .list<Discount>('discounts')
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    const promises: Promise<Product[]>[] = [];

    if (discounts) {
      for (let i = 0; i < discounts.length; i++) {
        promises.push(
          this.database
            .list<Product>('products', (query) =>
              query.orderByChild('id').equalTo(discounts[i].productId)
            )
            .valueChanges()
            .pipe(take(1))
            .toPromise()
        );
      }
    }

    const products: Product[][] = await Promise.all(promises);
    let res: Product[] = [];
    products.forEach((p) => (res = res.concat(p)));
    return Promise.resolve(res);
  }

  clear() {
    this.database.object('high-categories').remove();
    this.database.object('medium-categories').remove();
    this.database.object('low-categories').remove();
    this.database.object('lowest-categories').remove();
    this.database.object('products').remove();
    this.database.object('discounts').remove();
  }
}
