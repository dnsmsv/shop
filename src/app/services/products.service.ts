import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firebaseService: FirebaseService) {}

  getProducts(lowestCategoryRoute: string) {
    return new Promise<Product[]>((resolve) =>
      this.firebaseService
        .getProducts(lowestCategoryRoute)
        .subscribe((products) => resolve(products))
    );
  }
}
