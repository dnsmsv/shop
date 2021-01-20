import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  @Input() product: Product;
  @Input() order: Order;
  @Input() checked: boolean = true;

  @Output() checkChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() countChanged: EventEmitter<number> = new EventEmitter<number>();

  counts: number[] = [];
  pictureUrl: string;

  async ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.counts.push(i);
    }

    if (this.product) {
      const url: string = await this.firebaseService.getPictureUrl(
        this.product.picturesPath + '/small.png'
      );

      if (url) this.pictureUrl = url;
    }
  }

  checkClickHandler(): void {
    this.checked = !this.checked;
    this.checkChanged.emit(this.checked);
  }

  onchangeHandler(count: string): void {
    const countVal = Number(count);
    if (this.checked) this.countChanged.emit(countVal - this.order.count);

    this.order.count = countVal;
  }
}
