import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LowestCategory } from '../models/lowest-category.model';
import { Product } from '../models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  readonly colCount = 3;
  lowCategoryName: string;
  lowCategoryRoute: string;
  lowestCategories: LowestCategory[];
  allProducts: Product[] = [];
  products: Product[][] = [];
  selectedCategoryRoute: string;

  async ngOnInit() {
    this.lowCategoryName = this.route.snapshot.data.lowName;
    this.lowCategoryRoute = this.route.snapshot.data.lowRoute;
    this.selectedCategoryRoute = this.route.snapshot.data.lowRoute;
    const lowRoute: string = this.route.snapshot.data.lowRoute;
    this.lowestCategories = await this.productService.getLowestCategories(
      lowRoute
    );

    if (this.lowestCategories?.length) {
      for (let i = 0; i < this.lowestCategories.length; i++) {
        const categoryProducts: Product[] = await this.productService.getProducts(
          this.lowestCategories[i].route
        );

        if (categoryProducts?.length) {
          this.allProducts = this.allProducts.concat(categoryProducts);
        }
      }

      this.initColumnProducts(this.allProducts);
    }
  }

  initColumnProducts(categoryProducts: Product[]): void {
    const rowCount = Math.ceil(categoryProducts.length / this.colCount);
    const maxProductsColCount =
      categoryProducts.length - rowCount * (rowCount - 1);
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
    this.selectedCategoryRoute = this.lowCategoryRoute;
    this.initColumnProducts(this.allProducts);
  }

  lowestCategoryClickedHandler(category: LowestCategory): void {
    this.selectedCategoryRoute = category.route;
    this.initColumnProducts(
      this.allProducts.filter((p) => p.lowestCategoryRoute === category.route)
    );
  }
}
