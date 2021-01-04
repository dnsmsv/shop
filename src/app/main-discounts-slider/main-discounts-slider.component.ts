import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-main-discounts-slider',
  templateUrl: './main-discounts-slider.component.html',
  styleUrls: ['./main-discounts-slider.component.scss'],
})
export class MainDiscountsSliderComponent implements OnInit {
  private slideTimout: NodeJS.Timeout;

  constructor(private firebaseService: FirebaseService) {}

  discountUrls: string[];
  selectedIndex: number = 0;

  ngOnInit(): void {
    this.firebaseService.getMainDiscountUrls().then((urls) => {
      this.discountUrls = urls;
    });
    this.startSliderSimeout();
  }

  leftBtnHandler() {
    this.startSliderSimeout();
    if (this.discountUrls && this.discountUrls.length) {
      this.selectedIndex =
        this.selectedIndex === 0
          ? this.discountUrls.length - 1
          : this.selectedIndex - 1;
    }
  }

  rightBtnHandler() {
    this.startSliderSimeout();
    if (this.discountUrls && this.discountUrls.length) {
      this.selectedIndex = (this.selectedIndex + 1) % this.discountUrls.length;
    }
  }

  selectorHandler(index: number) {
    this.selectedIndex = index;
  }

  private startSliderSimeout() {
    clearTimeout(this.slideTimout);
    this.slideTimout = setTimeout(() => {
      this.rightBtnHandler();
    }, 5000);
  }
}
