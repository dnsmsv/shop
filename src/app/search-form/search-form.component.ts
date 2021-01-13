import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Discount } from '../models/discount.model';
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
      new LowestCategory('clothes', 'dresses', 'Dresses'),
      new LowestCategory('clothes', 'tshirts', 'T-shirts'),
      new LowestCategory('clothes', 'jeans', 'Jeans'),
      new LowestCategory('clothes', 'skirts', 'Skirts'),
      new LowestCategory('clothes', 'shorts', 'Shorts'),
      new LowestCategory('shoes', 'boots', 'Boots'),
      new LowestCategory('shoes', 'sneakers', 'Sneakers'),
      new LowestCategory('shoes', 'home-shoes', 'Home shoes'),
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
      new Product('dresses', '12', 'Dress', 783, 1299, 3),
      new Product('dresses', '13', 'Dress Love Republic', 1890, 3999, 5),
      new Product('dresses', '14', 'Dress Love Republic', 2849, 3999, 6),
      new Product('dresses', '15', 'Dress 1001', 2320, 4500, 3),
      new Product('tshirts', '16', 'T-shirt', 169, 499, 3),
      new Product('tshirts', '17', 'T-shirt', 156, 599, 3),
      new Product('tshirts', '18', 'T-shirt', 179, 599, 3),
      new Product('jeans', '19', 'Jeans', 1493, 1999, 3),
      new Product('jeans', '20', 'Jeans', 1205, 1999, 3),
      new Product('jeans', '21', 'Jeans', 917, 1499, 3),
      new Product('skirts', '22', 'Skirt Ultra', 199, 799, 3),
      new Product('skirts', '23', 'Skirt', 559, 699, 4),
      new Product('skirts', '24', 'Skirt Concept Club', 999, 1799, 4),
      new Product('skirts', '25', 'Skirt Zolla', 599, 1499, 2),
      new Product('skirts', '26', 'Skirt Zolla', 599, 1499, 2),
      new Product('skirts', '27', 'Skirt', 359, 899, 3),
      new Product('shorts', '28', 'Shorts', 566, 999, 3),
      new Product('shorts', '29', 'Shorts', 328, 599, 3),
      new Product('boots', '30', 'Boots TACARDI', 2699, null, 6),
      new Product('boots', '31', 'Boots', 1499, null, 5),
      new Product('boots', '32', 'Boots', 1565, 2999, 2),
      new Product('sneakers', '33', 'Sneakers G19 Sport', 999, 1599, 4),
      new Product('sneakers', '34', 'Sneakers Emanuele', 5900, 12900, 2),
      new Product('sneakers', '35', 'Sneakers Nobbaro', 1996, 4290, 2),
      new Product('home-shoes', '36', 'Slippers Smile of Milady', 315, 700, 3),
      new Product('home-shoes', '37', 'Slippers WALKFLEX', 518, 900, 3),
      new Product('home-shoes', '38', 'Slippers', 523, 1400, 1),
      new Product('home-shoes', '39', 'Slippers Bibalu', 590, 990, 1),
      new Product('home-shoes', '40', 'Slippers of Milady', 300, 890, 2),
    ]);
    this.databaseService.postDiscount([
      new Discount('1'),
      new Discount('3'),
      new Discount('5'),
      new Discount('6'),
      new Discount('9'),
      new Discount('10'),
      new Discount('11'),
    ]);
  }
}
