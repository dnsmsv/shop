import { Component, OnInit } from '@angular/core';
import { Favorite } from './models/favorite.model';
import { CatalogService } from './services/catalog.service';
import { FavoritesService } from './services/favorites.service';
import { FirebaseService } from './services/firebase.service';
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
