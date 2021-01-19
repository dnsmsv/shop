import { Component, OnInit } from '@angular/core';
import { Favorite } from './models/favorite.model';
import { Order } from './models/order.model';
import { CatalogService } from './services/catalog.service';
import { FavoritesService } from './services/favorites.service';
import { FirebaseService } from './services/firebase.service';
import { OrderlistService } from './services/orderlist.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private catalogService: CatalogService,
    private favoritesService: FavoritesService,
    private firebaseService: FirebaseService,
    private orderlistService: OrderlistService,
    private userService: UserService
  ) {}

  title = 'shop';
  visibility: boolean = false;

  ngOnInit(): void {
    this.userService.user.subscribe(async (user) => {
      if (user) {
        const favorites: Favorite[] = await this.firebaseService.getFavoriteProducts(
          user.email
        );
        this.favoritesService.init(favorites);
        const orders: Order[] = await this.firebaseService.getOrders(
          user.email
        );
        this.orderlistService.init(orders);
      }
    });

    this.userService.loginSignupVisibility.subscribe(
      (visibility) => (this.visibility = visibility)
    );
  }

  hideCatalog(): void {
    this.catalogService.hideCatalog();
  }
}
