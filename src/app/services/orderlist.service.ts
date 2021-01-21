import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderlistService {
  private _orders: BehaviorSubject<Order[]>;

  constructor() {
    this._orders = new BehaviorSubject<Order[]>([]);
  }

  get orders() {
    return this._orders;
  }

  init(orders: Order[]): void {
    this.orders.next(orders);
  }

  addOrder(order: Order): void {
    const newOrders: Order[] = this.orders.value;
    newOrders.push(order);
    this.orders.next(newOrders);
  }

  removeOrder(order: Order): void {
    const newOrders: Order[] = this.orders.value.filter(
      (f) => f.key !== order.key
    );
    this.orders.next(newOrders);
  }

  getOrder(productId: string): Order {
    return this.orders.value.find((f) => f.productId === productId);
  }

  clear(): void {
    this.orders.next([]);
  }

  update(): void {
    this.orders.next(this.orders.value);
  }
}
