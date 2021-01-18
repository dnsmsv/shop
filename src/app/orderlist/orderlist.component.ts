import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { FirebaseService } from '../services/firebase.service';
import { OrderlistService } from '../services/orderlist.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private orderlistService: OrderlistService
  ) {}

  orders: any[];

  async ngOnInit() {
    this.orderlistService.orders.subscribe(async (orders) => {
      this.orders = [];

      for (let i = 0; i < orders.length; i++) {
        const p = await this.firebaseService.getProduct(orders[i].productId);
        this.orders = this.orders.concat({
          product: p?.length ? p[0] : null,
          favorite: orders[i],
        });
      }
    });
  }
}
