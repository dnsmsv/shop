import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LowestCategory } from '../models/lowest-category.model';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { CatalogService } from '../services/catalog.service';
import { Favorite } from '../models/favorite.model';
import { FavoritesService } from '../services/favorites.service';
import { OrderlistService } from '../services/orderlist.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private catalogService: CatalogService,
    private favoritesService: FavoritesService,
    private orderlistService: OrderlistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  readonly colCount = 3;
  highCategoryName: string;
  highCategoryRoute: string;
  mediumCategoryName: string;
  mediumCategoryRoute: string;
  lowCategoryName: string;
  lowCategoryRoute: string;
  lowestCategories: LowestCategory[];
  products: Product[][] = [];
  selectedCategoryRoute: string;
  loading: boolean = false;

  async ngOnInit() {
    this.loading = true;
    this.highCategoryName = this.route.snapshot.data.highName;
    this.highCategoryRoute = this.route.snapshot.data.highRoute;
    this.mediumCategoryName = this.route.snapshot.data.mediumName;
    this.mediumCategoryRoute = this.route.snapshot.data.mediumRoute;
    this.lowCategoryName = this.route.snapshot.data.lowName;
    this.lowCategoryRoute = this.route.snapshot.data.lowRoute;
    const lowestCategoryRoute = this.route.snapshot.data.lowestRoute;
    this.lowestCategories = this.catalogService.lowestCategories.value.filter(
      (c) => c.lowCategoryRoute === this.lowCategoryRoute
    );
    let allProducts: Product[] = [];

    if (lowestCategoryRoute) {
      allProducts = await this.productService.getProducts(lowestCategoryRoute);
      this.selectedCategoryRoute = lowestCategoryRoute;
    } else if (this.lowestCategories?.length) {
      this.selectedCategoryRoute = this.lowCategoryRoute;

      for (let i = 0; i < this.lowestCategories.length; i++) {
        const categoryProducts: Product[] = await this.productService.getProducts(
          this.lowestCategories[i].route
        );

        if (categoryProducts?.length) {
          allProducts = allProducts.concat(categoryProducts);
        }
      }
    }

    this.initColumnProducts(allProducts);
    this.loading = false;
  }

  initColumnProducts(categoryProducts: Product[]): void {
    const rowCount = Math.ceil(categoryProducts.length / this.colCount);
    this.products = [];

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = [];

      for (let colIndex = 0; colIndex < this.colCount; colIndex++) {
        row.push(
          rowIndex * this.colCount + colIndex < categoryProducts.length
            ? categoryProducts[rowIndex * this.colCount + colIndex]
            : null
        );
      }

      this.products.push(row);
    }
  }

  lowCategoryClickHandler(): void {
    this.router.navigateByUrl(
      `${this.highCategoryRoute}/${this.mediumCategoryRoute}/${this.lowCategoryRoute}`
    );
  }

  lowestCategoryClickedHandler(lowestCategoryRoute: string): void {
    this.router.navigateByUrl(
      `${this.highCategoryRoute}/${this.mediumCategoryRoute}/${this.lowCategoryRoute}/${lowestCategoryRoute}`
    );
  }

  getFavorite(productId: string): Favorite {
    return this.favoritesService.getFavorite(productId);
  }

  getOrder(productId: string): Order {
    return this.orderlistService.getOrder(productId);
  }
}
