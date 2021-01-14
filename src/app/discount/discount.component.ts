import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discount } from '../models/discount.model';
import { Product } from '../models/product.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  @Input() discount: Discount;
  product: Product;
  pictureUrl: string;
  selected: boolean = false;
  productFullRoute: string;

  async ngOnInit() {
    const productArray: Product[] = await this.firebaseService.getProduct(
      this.discount.productId
    );

    if (productArray?.length) {
      this.product = productArray[0];
      this.productFullRoute = await this.firebaseService.getFullRoute(
        this.product.lowestCategoryRoute
      );
    }

    const path = `/discounts/${this.discount.productId}.png`;
    this.pictureUrl = await this.firebaseService.getDiscountPictureUrl(path);
  }

  clickHandler(): void {
    this.router.navigateByUrl(this.productFullRoute);
  }

  mouseoverHandler(): void {
    this.selected = true;
  }

  mouseleaveHandler(): void {
    this.selected = false;
  }
}
