import { Component, Input, OnInit } from '@angular/core';
import { Discount } from '../models/discount.model';
import { Product } from '../models/product.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  @Input() discount: Discount;
  product: Product;
  pictureUrl: string;

  async ngOnInit() {
    const productArray: Product[] = await this.firebaseService.getProduct(
      this.discount.productId
    );

    if (productArray?.length) this.product = productArray[0];

    this.pictureUrl = await this.firebaseService.getDiscountPictureUrl(
      this.discount.picturePath
    );
  }
}
