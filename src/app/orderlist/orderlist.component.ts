import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { AlertType } from '../models/alert-type';
import { Favorite } from '../models/favorite.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { AlertService } from '../services/alert.service';
import { FavoritesService } from '../services/favorites.service';
import { FirebaseService } from '../services/firebase.service';
import { OrderlistService } from '../services/orderlist.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private favoritesService: FavoritesService,
    private firebaseService: FirebaseService,
    private orderlistService: OrderlistService,
    private userService: UserService
  ) {}

  orders: any[];
  ordersTotalCount: number;
  ordersTotalPrice: number;
  ordersTotalOldPrice: number;
  ordersTotalDiscount: number;
  allChecked: boolean = true;

  async ngOnInit() {
    this.orderlistService.orders.subscribe(async (orders) => {
      this.orders = [];
      this.ordersTotalCount = 0;
      this.ordersTotalPrice = 0;
      this.ordersTotalOldPrice = 0;
      this.ordersTotalDiscount = 0;

      for (let i = 0; i < orders.length; i++) {
        const p = await this.firebaseService.getProduct(orders[i].productId);

        if (p?.length) {
          this.orders = this.orders.concat({
            product: p[0],
            order: orders[i],
            checked: true,
            inFavorites: Boolean(this.favoritesService.getFavorite(p[0].id)),
          });
          this.ordersTotalCount += orders[i].count;
          this.ordersTotalPrice += orders[i].count * p[0].price;

          this.ordersTotalOldPrice +=
            orders[i].count * (p[0].oldPrice ? p[0].oldPrice : p[0].price);
          this.ordersTotalDiscount += p[0].oldPrice
            ? orders[i].count * (p[0].oldPrice - p[0].price)
            : 0;
        }
      }
    });
  }

  checkChanged(checked: boolean, order): void {
    order.checked = checked;

    if (checked) {
      let allTrue = true;

      for (let i = 0; i < this.orders.length; i++) {
        if (!this.orders[i].checked) allTrue = false;
      }

      if (allTrue) this.allChecked = true;

      this.ordersTotalCount += order.order.count;
      this.ordersTotalOldPrice +=
        order.order.count *
        (order.product.oldPrice ? order.product.oldPrice : order.product.price);
      this.ordersTotalPrice += order.order.count * order.product.price;
      this.ordersTotalDiscount += order.product.oldPrice
        ? order.order.count * (order.product.oldPrice - order.product.price)
        : 0;
    } else {
      this.allChecked = false;
      this.ordersTotalCount -= order.order.count;
      this.ordersTotalOldPrice -=
        order.order.count *
        (order.product.oldPrice ? order.product.oldPrice : order.product.price);
      this.ordersTotalPrice -= order.order.count * order.product.price;
      this.ordersTotalDiscount -= order.product.oldPrice
        ? order.order.count * (order.product.oldPrice - order.product.price)
        : 0;
    }
  }

  countChanged(delta: number, product: Product): void {
    this.ordersTotalCount += delta;
    this.ordersTotalOldPrice +=
      delta * (product.oldPrice ? product.oldPrice : product.price);
    this.ordersTotalPrice += delta * product.price;
    this.ordersTotalDiscount += product.oldPrice
      ? delta * (product.oldPrice - product.price)
      : 0;
  }

  inFavoritesChanged(inFavorites: boolean, order): void {
    if (this.userService.user.value) {
      order.inFavorites = inFavorites;

      if (inFavorites) {
        const favorite = new Favorite(
          this.userService.user.value.email,
          order.product.id
        );
        this.firebaseService.postFavoriteProduct(favorite);
        this.favoritesService.addFavorite(favorite);
      } else {
        const favorite: Favorite = this.favoritesService.getFavorite(
          order.product.id
        );
        this.favoritesService.removeFavorite(favorite);
        this.firebaseService.removeFavoriteProduct(favorite);
      }
    }
  }

  removed(order): void {
    this.orders = this.orders.filter(
      (o) => o.order.productId !== order.order.productId
    );
    this.orderlistService.removeOrder(order.order);
    this.firebaseService.removeOrder(order.order);
  }

  removeSelected(): void {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].checked)
        this.firebaseService.removeOrder(this.orders[i].order);
    }

    this.orderlistService.init(
      this.orders.filter((o) => !o.checked).map((o) => o.order)
    );
  }

  checkboxClickHandler(): void {
    this.allChecked = !this.allChecked;
    let ordersTotalCount: number = 0;
    let ordersTotalPrice: number = 0;
    let ordersTotalOldPrice: number = 0;
    let ordersTotalDiscount: number = 0;

    for (let i = 0; i < this.orders.length; i++) {
      this.orders[i].checked = this.allChecked;

      if (this.allChecked) {
        ordersTotalCount += this.orders[i].order.count;
        ordersTotalPrice +=
          this.orders[i].order.count * this.orders[i].product.price;

        ordersTotalOldPrice +=
          this.orders[i].order.count *
          (this.orders[i].product.oldPrice
            ? this.orders[i].product.oldPrice
            : this.orders[i].product.price);
        ordersTotalDiscount += this.orders[i].product.oldPrice
          ? this.orders[i].order.count *
            (this.orders[i].product.oldPrice - this.orders[i].product.price)
          : 0;
      }
    }

    this.ordersTotalCount = ordersTotalCount;
    this.ordersTotalPrice = ordersTotalPrice;
    this.ordersTotalOldPrice = ordersTotalOldPrice;
    this.ordersTotalDiscount = ordersTotalDiscount;
  }

  checkout(): void {
    this.alertService.show(
      "'Procced to checkout' is not realized",
      AlertType.Info
    );
  }
}
