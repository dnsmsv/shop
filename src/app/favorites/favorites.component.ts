import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  constructor(
    private favoritesService: FavoritesService,
    private firebaseService: FirebaseService
  ) {}

  favorites: any[];

  async ngOnInit() {
    this.favoritesService.favorites.subscribe(async (favorites) => {
      this.favorites = [];

      for (let i = 0; i < favorites.length; i++) {
        const p = await this.firebaseService.getProduct(favorites[i].productId);
        this.favorites = this.favorites.concat({
          product: p?.length ? p[0] : null,
          favorite: favorites[i],
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.favoritesService.favorites.unsubscribe();
  }
}
