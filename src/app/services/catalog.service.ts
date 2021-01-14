import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { BehaviorSubject, Observable } from 'rxjs';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { LowestCategory } from '../models/lowest-category.model';
import { MediumCategory } from '../models/medium-category.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private _catalogVisibility: BehaviorSubject<boolean>;
  private _highCategories: BehaviorSubject<HighCategory[]>;
  private _mediumCategories: BehaviorSubject<MediumCategory[]>;
  private _lowCategories: BehaviorSubject<LowCategory[]>;
  private _lowestCategories: BehaviorSubject<LowestCategory[]>;

  constructor(private firebaseService: FirebaseService) {
    this._catalogVisibility = new BehaviorSubject<boolean>(false);
    this._highCategories = new BehaviorSubject<HighCategory[]>([]);
    this._mediumCategories = new BehaviorSubject<MediumCategory[]>([]);
    this._lowCategories = new BehaviorSubject<LowCategory[]>([]);
    this._lowestCategories = new BehaviorSubject<LowestCategory[]>([]);
  }

  get catalogVisibility() {
    return this._catalogVisibility;
  }

  get highCategories(): BehaviorSubject<HighCategory[]> {
    return this._highCategories;
  }

  get mediumCategories(): BehaviorSubject<MediumCategory[]> {
    return this._mediumCategories;
  }

  get lowCategories(): BehaviorSubject<LowCategory[]> {
    return this._lowCategories;
  }

  get lowestCategories(): BehaviorSubject<LowestCategory[]> {
    return this._lowestCategories;
  }

  showCatalog(): void {
    this.catalogVisibility.next(true);
  }

  hideCatalog(): void {
    this.catalogVisibility.next(false);
  }

  loadCatalog(): Promise<[void, void, void, void]> {
    const highPromise = new Promise<void>((resolve) =>
      this.firebaseService.getHighCategories().subscribe((categories) => {
        this._highCategories.next(categories);
        resolve();
      })
    );
    const mediumPromise = new Promise<void>((resolve) =>
      this.firebaseService.getMediumCategories().subscribe((categories) => {
        this._mediumCategories.next(categories);
        resolve();
      })
    );
    const lowPromise = new Promise<void>((resolve) =>
      this.firebaseService.getLowCategories().subscribe((categories) => {
        this._lowCategories.next(categories);
        resolve();
      })
    );
    const lowestPromise = new Promise<void>((resolve) =>
      this.firebaseService.getLowestCategories().subscribe((categories) => {
        this._lowestCategories.next(categories);
        resolve();
      })
    );
    return Promise.all([highPromise, mediumPromise, lowPromise, lowestPromise]);
  }
}
