import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { LowestCategory } from '../models/lowest-category.model';
import { MainDiscount } from '../models/main-discount.model';
import { MediumCategory } from '../models/medium-category.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase
  ) {}

  getMainDiscountUrls() {
    return new Promise<string[]>((resolve) => {
      this.database
        .list<MainDiscount>('main-discounts')
        .valueChanges()
        .subscribe((discounts) => {
          const urls = [];
          discounts.forEach((discount) => {
            this.storage
              .ref(discount.storagePath)
              .getDownloadURL()
              .subscribe((url) => {
                urls.push(url);
                resolve(urls);
              });
          });
        });
    });
  }

  getHighCategories(): Observable<HighCategory[]> {
    return this.database.list<HighCategory>('high-categories').valueChanges();
  }

  getMediumCategories(): Observable<MediumCategory[]> {
    return this.database
      .list<MediumCategory>('medium-categories')
      .valueChanges();
  }

  getLowCategories(): Observable<LowCategory[]> {
    return this.database.list<LowCategory>('low-categories').valueChanges();
  }

  getLowestCategories(): Observable<LowestCategory[]> {
    return this.database
      .list<LowestCategory>('lowest-categories')
      .valueChanges();
  }

  clear() {
    this.database.object('high-categories').remove();
    this.database.object('medium-categories').remove();
    this.database.object('low-categories').remove();
    this.database.object('lowest-categories').remove();
    this.database.object('products').remove();
  }
}
