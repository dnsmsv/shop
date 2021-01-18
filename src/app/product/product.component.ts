import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild('picture') private picture: ElementRef;

  private leftPosition: number;
  private width: number;

  constructor(
    private alertService: AlertService,
    private favoritesService: FavoritesService,
    private firebaseService: FirebaseService,
    private orderlistService: OrderlistService,
    private userService: UserService
  ) {}

  selectedUrl: string;
  urls: string[];
  mouseOnPicture: boolean = false;
  selected: boolean = false;
  isFavorite: boolean = false;

  @Input() product: Product;
  @Input() favorite: Favorite;
  @Input() order: Order;

  async ngOnInit() {
    this.isFavorite = Boolean(this.favorite);

    if (this.product) {
      this.urls = await this.firebaseService.getProductPictureUrls(
        this.product
      );

      if (this.urls?.length) this.selectedUrl = this.urls[0];

      if (!this.favorite) {
        this.userService.user.subscribe((user) => {
          if (user) {
            this.favorite = new Favorite(user.email, this.product.id);
          }
        });
      }

      if (!this.order) {
        this.userService.user.subscribe((user) => {
          if (user) {
            this.order = new Order(user.email, this.product.id);
          }
        });
      }
    }
  }

  ngAfterViewInit(): void {
    const rect = this.picture.nativeElement.getBoundingClientRect();
    this.leftPosition = rect.x;
    this.width = rect.width;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.mouseOnPicture && this.urls) {
      const areaWidth = this.width / this.urls.length;

      for (let i = 0; i < this.urls.length; i++) {
        if (
          event.clientX > this.leftPosition + areaWidth * i &&
          event.clientX <= this.leftPosition + areaWidth * (i + 1)
        ) {
          this.selectedUrl = this.urls[i];
        }
      }
    }
  }

  mouseoverHandler() {
    this.mouseOnPicture = true;
  }

  mouseoutHandler() {
    this.mouseOnPicture = false;
  }

  changeFavoriteState(): void {
    if (this.userService.user.value) {
      this.isFavorite = !this.isFavorite;

      if (this.isFavorite) {
        this.favoritesService.addFavorite(this.favorite);
        this.firebaseService.postFavoriteProduct(this.favorite);
      } else {
        this.favoritesService.removeFavorite(this.favorite);
        this.firebaseService.removeFavoriteProduct(this.favorite);
      }
    } else {
      this.alertService.show('You should login or signup', AlertType.Info);
      this.userService.showLoginSignupForm(true);
    }
  }

  mouseenterHandler() {
    this.selected = true;
  }

  mouseleaveHandler() {
    this.selected = false;
  }

  addToCart(): void {
    if (this.userService.user.value) {
      this.orderlistService.addOrder(this.order);
    } else {
      this.alertService.show('You should login or signup', AlertType.Info);
      this.userService.showLoginSignupForm(true);
    }
  }
}
