import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { LowestCategory } from '../models/lowest-category.model';
import { MediumCategory } from '../models/medium-category.model';
import { Product } from '../models/product.model';
import { DatabaseService } from '../services/database.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService
  ) {}

  form: FormGroup;
  text: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
    });
  }

  search() {
    this.firebaseService.clear();
    this.databaseService.postCategory([
      new HighCategory('1', 'Сlothes, shoes and accessories'),
      new HighCategory('2', 'Electronics'),
      new HighCategory('3', 'Baby products'),
    ]);
    this.databaseService.postMediumCategory([
      new MediumCategory('1', '1', 'For women'),
      new MediumCategory('1', '2', 'For men'),
      new MediumCategory('1', '3', 'For children'),
      new MediumCategory('1', '4', 'Sport'),
      new MediumCategory('1', '5', 'Travels'),
      new MediumCategory('1', '6', 'Coveralls'),
    ]);
    this.databaseService.postLowCategory([
      new LowCategory('1', '1', 'Clothes'),
      new LowCategory('1', '2', 'Shoes'),
      new LowCategory('1', '3', 'Accessories'),
      new LowCategory('1', '4', 'Home clothes'),
      new LowCategory('2', '5', 'Clothes'),
      new LowCategory('2', '6', 'Shoes'),
      new LowCategory('2', '7', 'Socks'),
      new LowCategory('2', '8', 'Home clothes'),
      new LowCategory('3', '9', 'Clothes'),
      new LowCategory('3', '10', 'Shoes'),
      new LowCategory('3', '11', 'School uniform'),
      new LowCategory('4', '12', 'For women'),
      new LowCategory('4', '13', 'For men'),
      new LowCategory('4', '14', 'For children'),
      new LowCategory('5', '15', 'Baggage'),
      new LowCategory('5', '16', 'Accessories for travels'),
      new LowCategory('6', '17', 'Work overalls'),
      new LowCategory('6', '18', 'Work shoes'),
      new LowCategory('6', '19', 'Medical clothes'),
      new LowCategory('6', '20', 'Medical shoes'),
    ]);
    this.databaseService.postLowestCategory([
      new LowestCategory('1', '1', 'Outewear'),
      new LowestCategory('1', '2', 'Sweaters'),
    ]);
    this.databaseService.postProduct([
      new Product('1', '1', 'Down coat', 8075, 14000, '/products/1/'),
    ]);
  }
}
