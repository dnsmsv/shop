import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { MediumCategory } from '../models/medium-category.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private _catalogVisibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private firebaseService: FirebaseService) {}

  get catalogVisibility() {
    return this._catalogVisibility;
  }

  showCatalog() {
    this.catalogVisibility.next(true);
  }

  hideCatalog() {
    this.catalogVisibility.next(false);
  }

  getHighCategories(): Promise<HighCategory[]> {
    return new Promise((resolve) =>
      this.firebaseService
        .getHighCategories()
        .subscribe((categories) => resolve(categories))
    );
  }

  getMediumCategories(): Promise<MediumCategory[]> {
    return new Promise((resolve) =>
      this.firebaseService
        .getMediumCategories()
        .subscribe((categories) => resolve(categories))
    );
  }

  getLowCategories(): Promise<LowCategory[]> {
    return new Promise((resolve) =>
      this.firebaseService
        .getLowCategories()
        .subscribe((categories) => resolve(categories))
    );
  }
}
