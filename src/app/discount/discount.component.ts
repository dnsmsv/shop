import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  @Input() product: Product;
  pictureUrl: string;

  async ngOnInit() {
    const urls: string[] = await this.firebaseService.getProductPictureUrls(
      this.product
    );

    if (urls?.length) this.pictureUrl = urls[0];
  }
}
