import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  selectedUrl: string;

  @Input() product: Product;

  async ngOnInit() {
    if (this.product) {
      const urls: string[] = await this.firebaseService.getProductPictureUrls(
        this.product
      );

      if (urls?.length) this.selectedUrl = urls[0];
    }
  }
}
