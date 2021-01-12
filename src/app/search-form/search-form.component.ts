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
      new HighCategory(
        'clothes-shoes-accessories',
        'Сlothes, shoes and accessories'
      ),
      new HighCategory('electronics', 'Electronics'),
      new HighCategory('baby-products', 'Baby products'),
    ]);
    this.databaseService.postMediumCategory([
      new MediumCategory('clothes-shoes-accessories', 'for-women', 'For women'),
      new MediumCategory('clothes-shoes-accessories', 'for-men', 'For men'),
      new MediumCategory(
        'clothes-shoes-accessories',
        'for-children',
        'For children'
      ),
      new MediumCategory('clothes-shoes-accessories', 'sport', 'Sport'),
      new MediumCategory('clothes-shoes-accessories', 'travels', 'Travels'),
      new MediumCategory('clothes-shoes-accessories', 'coveralls', 'Coveralls'),
    ]);
    this.databaseService.postLowCategory([
      new LowCategory('for-women', 'clothes', 'Clothes'),
      new LowCategory('for-women', 'shoes', 'Shoes'),
      new LowCategory('for-women', 'accessories', 'Accessories'),
      new LowCategory('for-women', 'home-clothes', 'Home clothes'),
      new LowCategory('for-men', 'clothes', 'Clothes'),
      new LowCategory('for-men', 'shoes', 'Shoes'),
      new LowCategory('for-men', 'socks', 'Socks'),
      new LowCategory('for-men', 'home-clothes', 'Home clothes'),
      new LowCategory('for-children', 'clothes', 'Clothes'),
      new LowCategory('for-children', 'shoes', 'Shoes'),
      new LowCategory('for-children', 'school-uniform', 'School uniform'),
      new LowCategory('sport', 'for-women', 'For women'),
      new LowCategory('sport', 'for-men', 'For men'),
      new LowCategory('sport', 'for-children', 'For children'),
      new LowCategory('travels', 'baggage', 'Baggage'),
      new LowCategory(
        'travels',
        'accessories-for-travels',
        'Accessories for travels'
      ),
      new LowCategory('coveralls', 'work-overalls', 'Work overalls'),
      new LowCategory('coveralls', 'work-shoes', 'Work shoes'),
      new LowCategory('coveralls', 'medical-clothes', 'Medical clothes'),
      new LowCategory('coveralls', 'medical-shoes', 'Medical shoes'),
    ]);
    this.databaseService.postLowestCategory([
      new LowestCategory('clothes', 'outewear', 'Outewear'),
      new LowestCategory('clothes', 'sweaters', 'Sweaters'),
    ]);
    this.databaseService.postProduct([
      new Product('outewear', '1', 'Down coat', 8075, 14000, 2),
      new Product('outewear', '2', 'Down jacket', 8075, 14000, 2),
      new Product('outewear', '3', 'Down jacket', 5320, 10900, 1),
      new Product('outewear', '4', 'Down coat Zolla', 4999, null, 3),
      new Product('outewear', '5', 'Down jacket', 3696, 8990, 1),
      new Product('outewear', '6', 'Jacket', 800, 3499, 4),
      new Product('outewear', '7', 'Warm coat', 2999, 5999, 4),
      new Product('sweaters', '8', 'Sweater', 665, 1999, 3),
      new Product('sweaters', '9', 'Sweater Love Republic', 2099, 2999, 5),
      new Product('sweaters', '10', 'Jumper', 485, 1499, 3),
      new Product('sweaters', '11', 'Jumper', 1117, 1799, 3),
    ]);
  }
}
