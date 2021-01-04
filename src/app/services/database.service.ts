import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MainDiscount } from '../models/main-discount.model';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  // postProduct() {
  //   const p = new Product();
  //   p.id = 1;
  //   p.name = 'Acvafor';
  //   p.price = 708;
  //   p.picturesPath =
  //     '/products/house and garden/dishes/filters for water/acvafor/';
  //   this.http
  //     .post<MainDiscount>(
  //       `${environment.firebase.databaseURL}/products.json`,
  //       p,
  //       {
  //         headers: {
  //           'content-type': 'application/json',
  //         },
  //       }
  //     )
  //     .subscribe(() => console.log('Success'));
  // }
}
