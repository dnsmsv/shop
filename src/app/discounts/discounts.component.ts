import { Component, OnInit } from '@angular/core';
import { Discount } from '../models/discount.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  discounts: Discount[];

  async ngOnInit() {
    this.discounts = await this.firebaseService.getDiscounts();
  }
}
