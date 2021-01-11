import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MainDiscount } from '../models/main-discount.model';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HighCategory } from '../models/high-category.model';
import { MediumCategory } from '../models/medium-category.model';
import { LowCategory } from '../models/low-category.model';
import { LowestCategory } from '../models/lowest-category.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  // getMainDiscounts(): Observable<MainDiscount[]> {
  //   return this.http
  //     .get(`${environment.firebase.databaseURL}/main-discounts.json`, {
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     })
  //     .pipe(
  //       map((discounts) => {
  //         if (discounts) {
  //           return Reflect.ownKeys(discounts).map(
  //             (key) =>
  //               ({
  //                 ...discounts[key],
  //               } as MainDiscount)
  //           );
  //         }
  //       })
  //     );
  // }

  // getStorageData(path: string) {
  //   const p = `${environment.firebase.storageBucket}${path}`;
  //   console.log(p);

  //   return this.http.get(p, {
  //     headers: {
  //       'content-type': 'image/jpg',
  //     },
  //   });
  // }

  postImg() {
    const m = new MainDiscount(1, 'main-discounts/acvafor.jpg');
    this.http
      .post<MainDiscount>(
        `${environment.firebase.databaseURL}/main-discounts.json`,
        m,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .subscribe(() => console.log('Success'));
  }

  postProduct(products: Product[]) {
    products.forEach((product) => {
      this.http
        .post<MainDiscount>(
          `${environment.firebase.databaseURL}/products.json`,
          product,
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        .subscribe(() => console.log('Success'));
    });
  }

  postCategory(categories: HighCategory[]) {
    categories.forEach((category) => {
      this.http
        .post<HighCategory>(
          `${environment.firebase.databaseURL}/high-categories.json`,
          category,
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        .subscribe(() => console.log('Success'));
    });
  }

  async postMediumCategory(categories: MediumCategory[]) {
    for (let i = 0; i < categories.length; i++) {
      await new Promise((resolve) =>
        this.http
          .post<HighCategory>(
            `${environment.firebase.databaseURL}/medium-categories.json`,
            categories[i],
            {
              headers: {
                'content-type': 'application/json',
              },
            }
          )
          .subscribe(() => resolve({}))
      );
    }
  }

  async postLowCategory(categories: LowCategory[]) {
    for (let i = 0; i < categories.length; i++) {
      await new Promise((resolve) =>
        this.http
          .post<HighCategory>(
            `${environment.firebase.databaseURL}/low-categories.json`,
            categories[i],
            {
              headers: {
                'content-type': 'application/json',
              },
            }
          )
          .subscribe(() => resolve({}))
      );
    }
  }

  async postLowestCategory(categories: LowestCategory[]) {
    for (let i = 0; i < categories.length; i++) {
      await new Promise((resolve) =>
        this.http
          .post<HighCategory>(
            `${environment.firebase.databaseURL}/lowest-categories.json`,
            categories[i],
            {
              headers: {
                'content-type': 'application/json',
              },
            }
          )
          .subscribe(() => resolve({}))
      );
    }
  }
}
