import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Favorite } from '../models/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _favorites: BehaviorSubject<Favorite[]>;

  constructor() {
    this._favorites = new BehaviorSubject<Favorite[]>([]);
  }

  get favorites() {
    return this._favorites;
  }

  init(favorites: Favorite[]): void {
    this.favorites.next(favorites);
  }

  addFavorite(favorite: Favorite): void {
    const newFavorites: Favorite[] = this.favorites.value;
    newFavorites.push(favorite);
    this.favorites.next(newFavorites);
  }

  removeFavorite(favorite: Favorite): void {
    const newFavorites: Favorite[] = this.favorites.value.filter(
      (f) => f.key !== favorite.key
    );
    this.favorites.next(newFavorites);
  }

  getFavorite(productId: string): Favorite {
    return this.favorites.value.find((f) => f.productId === productId);
  }

  clear(): void {
    this.favorites.next([]);
  }
}
