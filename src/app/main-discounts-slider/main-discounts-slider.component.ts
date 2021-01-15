import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MainDiscount } from '../models/main-discount.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-main-discounts-slider',
  templateUrl: './main-discounts-slider.component.html',
  styleUrls: ['./main-discounts-slider.component.scss'],
})
export class MainDiscountsSliderComponent implements OnInit, OnDestroy {
  private slideTimout: NodeJS.Timeout;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  @ViewChild('slider') slider: ElementRef;
  mainDiscounts: MainDiscount[];
  discountUrls: string[] = [];
  selectedIndex: number = 0;

  async ngOnInit() {
    this.mainDiscounts = await this.firebaseService.getMainDiscounts();

    if (this.mainDiscounts?.length) {
      for (let i = 0; i < this.mainDiscounts.length; i++) {
        const url: string = await this.firebaseService.getMainDiscountPictureUrl(
          this.mainDiscounts[i]
        );
        this.discountUrls.push(url);
      }
    }

    this.startSliderSimeout();
  }

  ngOnDestroy() {
    clearTimeout(this.slideTimout);
  }

  async sliderClickHandler(event: MouseEvent) {
    if (event.target === this.slider.nativeElement) {
      const fullRoute: string = await this.firebaseService.getFullRoute(
        this.mainDiscounts[this.selectedIndex].lowestCategoryRoute
      );
      this.router.navigateByUrl(fullRoute);
    }
  }

  leftBtnHandler(): void {
    this.startSliderSimeout();

    if (this.discountUrls && this.discountUrls.length) {
      this.selectedIndex =
        this.selectedIndex === 0
          ? this.discountUrls.length - 1
          : this.selectedIndex - 1;
    }
  }

  rightBtnHandler(): void {
    this.startSliderSimeout();
    if (this.discountUrls && this.discountUrls.length) {
      this.selectedIndex = (this.selectedIndex + 1) % this.discountUrls.length;
    }
  }

  selectorHandler(index: number): void {
    this.selectedIndex = index;
  }

  private startSliderSimeout(): void {
    clearTimeout(this.slideTimout);
    this.slideTimout = setTimeout(() => {
      this.rightBtnHandler();
    }, 8000);
  }
}
