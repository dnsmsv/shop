import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType } from '../models/alert-type';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { CatalogService } from '../services/catalog.service';
import { FavoritesService } from '../services/favorites.service';
import { OrderlistService } from '../services/orderlist.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private catalogService: CatalogService,
    private favoritesService: FavoritesService,
    private orderlistService: OrderlistService,
    private userService: UserService,
    private router: Router
  ) {}

  catalogVisibility: boolean = false;
  accountManuVisibility: boolean = false;
  userName: string;
  ordersCount: number = 0;
  favoritesCount: number = 0;

  ngOnInit(): void {
    this.catalogService.catalogVisibility.subscribe((visibility) => {
      this.catalogVisibility = visibility;
    });
    this.favoritesService.favorites.subscribe(
      (f) => (this.favoritesCount = f.length)
    );
    this.orderlistService.orders.subscribe((orders) => {
      this.ordersCount = 0;

      if (orders) {
        orders.forEach((o) => {
          this.ordersCount += o.count;
        });
      }
    });
    this.userService.user.subscribe((user) => {
      if (user) this.userName = user.name;
      else {
        this.userName = '';
        this.favoritesCount = 0;
        this.ordersCount = 0;
      }
    });
  }

  accountMouseenterHandler(): void {
    this.accountManuVisibility = true;
  }

  accountMouseleaveHandler(): void {
    this.accountManuVisibility = false;
  }

  signup(): void {
    this.userService.showLoginSignupForm(false);
  }

  login(): void {
    this.userService.showLoginSignupForm(true);
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.favoritesService.clear();
      this.orderlistService.clear();
    } catch (error) {
      this.alertService.show(error.message, AlertType.Error);
    }
  }

  showOrderlist(): void {
    this.router.navigateByUrl('/orderlist');
  }

  showFavorites(): void {
    this.router.navigateByUrl('/favorites');
  }
}
