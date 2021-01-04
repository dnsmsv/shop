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
import { MainDiscount } from '../models/main-discount.model';

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
}
