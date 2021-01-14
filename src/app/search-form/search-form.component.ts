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
      new HighCategory('electronics', 'Electronics (empty)'),
      new HighCategory('baby-products', 'Baby products (empty)'),
      new HighCategory('house-garden', 'House and garden (empty)'),
      new HighCategory('health-beauty', 'Health and beauty (empty)'),
      new HighCategory('appliances', 'Appliances (empty)'),
      new HighCategory('sport', 'Sport (empty)'),
      new HighCategory('food', 'Food (empty)'),
    ]);
    this.databaseService.postMediumCategory([
      new MediumCategory('clothes-shoes-accessories', 'for-women', 'For women'),
      new MediumCategory(
        'clothes-shoes-accessories',
        'for-men',
        'For men (empty)'
      ),
      new MediumCategory(
        'clothes-shoes-accessories',
        'for-children',
        'For children (empty)'
      ),
      new MediumCategory('clothes-shoes-accessories', 'sport', 'Sport (empty)'),
      new MediumCategory(
        'clothes-shoes-accessories',
        'travels',
        'Travels (empty)'
      ),
      new MediumCategory(
        'clothes-shoes-accessories',
        'coveralls',
        'Coveralls (empty)'
      ),
    ]);
    this.databaseService.postLowCategory([
      new LowCategory('for-women', 'women-clothes', 'Clothes'),
      new LowCategory('for-women', 'women-shoes', 'Shoes'),
      new LowCategory('for-women', 'women-accessories', 'Accessories'),
      new LowCategory('for-women', 'women-home-clothes', 'Home clothes'),
      new LowCategory('for-men', 'men-clothes', 'Clothes'),
      new LowCategory('for-men', 'men-shoes', 'Shoes'),
      new LowCategory('for-men', 'men-socks', 'Socks'),
      new LowCategory('for-men', 'men-home-clothes', 'Home clothes'),
      new LowCategory('for-children', 'children-clothes', 'Clothes'),
      new LowCategory('for-children', 'children-shoes', 'Shoes'),
      new LowCategory(
        'for-children',
        'children-school-uniform',
        'School uniform'
      ),
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
      new LowestCategory('women-clothes', 'outewear', 'Outewear'),
      new LowestCategory('women-clothes', 'sweaters', 'Sweaters'),
      new LowestCategory('women-clothes', 'dresses', 'Dresses'),
      new LowestCategory('women-clothes', 'tshirts', 'T-shirts'),
      new LowestCategory('women-clothes', 'jeans', 'Jeans'),
      new LowestCategory('women-clothes', 'skirts', 'Skirts'),
      new LowestCategory('women-clothes', 'shorts', 'Shorts'),
      new LowestCategory('women-shoes', 'boots', 'Boots'),
      new LowestCategory('women-shoes', 'sneakers', 'Sneakers'),
      new LowestCategory('women-shoes', 'home-shoes', 'Home shoes'),
      new LowestCategory('women-accessories', 'bags', 'Bags'),
      new LowestCategory('women-accessories', 'backpacks', 'Backpacks'),
      new LowestCategory('women-accessories', 'glasses', 'Glasses'),
      new LowestCategory('women-accessories', 'watch', 'Watch'),
      new LowestCategory('women-accessories', 'umbrellas', 'Umbrellas'),
      new LowestCategory('women-home-clothes', 'bathrobes', 'Bathrobes'),
      new LowestCategory('women-home-clothes', 'pajamas', 'Pajamas'),
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
      new Product('home-shoes', '36', 'Slippers Smile of Milady', 315, 700, 2),
      new Product('home-shoes', '37', 'Slippers WALKFLEX', 518, 900, 3),
      new Product('home-shoes', '38', 'Slippers', 523, 1400, 1),
      new Product('home-shoes', '39', 'Slippers Bibalu', 590, 990, 1),
      new Product('home-shoes', '40', 'Slippers of Milady', 300, 890, 2),
      new Product('bags', '41', 'Bag DePalis', 1190, 2960, 2),
      new Product('bags', '42', 'Bag Baellerry', 910, 3960, 3),
      new Product('bags', '43', 'Bag DePalis', 2800, 3590, 3),
      new Product('bags', '44', 'Bag ViPiDi', 2254, 3715, 1),
      new Product('backpacks', '45', 'Backpack TINA', 599, 999, 5),
      new Product('backpacks', '46', 'Backpack', 799, null, 2),
      new Product('backpacks', '47', 'Backpack Cagia', 598, 1698, 3),
      new Product('backpacks', '48', 'Backpack OrsOro', 1000, 2199, 1),
      new Product('glasses', '49', 'Glasses ElContrabando', 350, 999, 2),
      new Product('glasses', '50', 'Case for glasses', 399, null, 3),
      new Product('glasses', '51', 'Sunglasses', 899, 1299, 1),
      new Product('glasses', '52', 'Glasses wipes', 250, 400, 1),
      new Product('watch', '53', 'Watch LINKS SKY', 930, 3100, 4),
      new Product('umbrellas', '54', 'Umbrella', 649, 1500, 3),
      new Product('umbrellas', '55', 'Umbrella', 799, 1253, 1),
      new Product('bathrobes', '56', 'Bathrobes', 999, 1299, 2),
      new Product('bathrobes', '57', 'Bathrobes', 1097, 1999, 3),
      new Product('pajamas', '58', 'Pajama', 713, 1299, 1),
      new Product('pajamas', '59', 'Pajama', 999, 1590, 2),
      new Product('pajamas', '60', 'Pajama PINKY', 1260, 2100, 1),
    ]);
    this.databaseService.postDiscount([
      new Discount('17'),
      new Discount('32'),
      new Discount('6'),
      new Discount('10'),
      new Discount('11'),
      new Discount('59'),
      new Discount('20'),
      new Discount('25'),
      new Discount('40'),
      new Discount('3'),
      new Discount('35'),
      new Discount('1'),
    ]);
  }
}
