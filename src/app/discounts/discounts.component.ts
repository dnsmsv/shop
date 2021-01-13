import { Component, OnInit } from '@angular/core';
import { Discount } from '../models/discount.model';
import { Product } from '../models/product.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  products: Product[];

  async ngOnInit() {
    this.products = await this.firebaseService.getDiscountProducts();
  }
}
