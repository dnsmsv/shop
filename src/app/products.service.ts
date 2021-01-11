import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { BehaviorSubject } from 'rxjs';
import { LowCategory } from './models/low-category.model';
import { LowestCategory } from './models/lowest-category.model';
import { Product } from './models/product.model';
import { FirebaseService } from './services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firebaseService: FirebaseService) {}

  lowestCategories = new BehaviorSubject<LowestCategory[]>([]);
  products = new BehaviorSubject<Product[]>([]);

  getLowestCategories(lowCategoryRoute: string): Promise<LowestCategory[]> {
    return new Promise<LowestCategory[]>((resolve) =>
      this.firebaseService
        .getLowestCategories(lowCategoryRoute)
        .subscribe((categories) => resolve(categories))
    );
  }

  getProducts(lowestCategoryRoute: string) {
    return new Promise<Product[]>((resolve) =>
      this.firebaseService
        .getProducts(lowestCategoryRoute)
        .subscribe((products) => resolve(products))
    );
  }
}
