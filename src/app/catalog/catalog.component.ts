import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { MediumCategory } from '../models/medium-category.model';
import { ProductsComponent } from '../products/products.component';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  private colCount = 3;

  constructor(private catalogService: CatalogService, private router: Router) {
    this.loadCategories();
  }

  highCategories: HighCategory[] = [];
  mediumCategories: MediumCategory[] = [];
  lowCategories: LowCategory[] = [];

  selectedHighCategoryRoute: string;
  columnMediumCategories: MediumCategory[][] = [];

  async loadCategories() {
    const high: HighCategory[] = await this.catalogService.getHighCategories();
    this.highCategories = high;

    if (high?.length) {
      this.selectedHighCategoryRoute = high[0].route;
      high.forEach(async (h) => {
        const medium: MediumCategory[] = await this.catalogService.getMediumCategories(
          h.route
        );

        if (medium?.length) {
          this.mediumCategories = this.mediumCategories.concat(medium);

          if (this.selectedHighCategoryRoute === h.route)
            this.initColumnMediumCategories(this.selectedHighCategoryRoute);

          medium.forEach(async (m) => {
            const low = await this.catalogService.getLowCategories(m.route);

            if (low?.length) {
              this.lowCategories = this.lowCategories.concat(low);
              low.forEach((l) =>
                this.router.config.push({
                  path: `${h.route}/${m.route}/${l.route}`,
                  component: ProductsComponent,
                  data: {
                    highRoute: h.route,
                    mediumRoute: m.route,
                    lowRoute: l.route,
                    lowName: l.name,
                  },
                })
              );
            }
          });
        }
      });
    }
  }

  async ngOnInit() {}

  highCategoryMouseover(highCategoryRoute: string) {
    this.selectedHighCategoryRoute = highCategoryRoute;
    this.initColumnMediumCategories(highCategoryRoute);
  }

  initColumnMediumCategories(highCategoryRoute: string): void {
    if (!this.mediumCategories) return;

    const categories = this.mediumCategories.filter(
      (c) => c.highCategoryRoute == highCategoryRoute
    );
    const categoryInColCount = Math.ceil(categories.length / this.colCount);
    const maxCategoriesColCount =
      categories.length - categoryInColCount * (categoryInColCount - 1);
    this.columnMediumCategories = [];

    for (let i = 0; i < this.colCount; i++) {
      const mediumCategories = [];
      const maxCategoriesCount =
        i < maxCategoriesColCount ? categoryInColCount : categoryInColCount - 1;

      for (let j = 0; j < maxCategoriesCount; j++) {
        mediumCategories.push(categories[i * maxCategoriesCount + j]);
      }

      this.columnMediumCategories.push(mediumCategories);
    }
  }

  getLowCategories(mediumCategoryRoute: string): LowCategory[] {
    if (this.lowCategories) {
      return this.lowCategories.filter(
        (c) => c.mediumCategoryRoute == mediumCategoryRoute
      );
    }

    return null;
  }

  showProduct(mediumCategory: MediumCategory, lowCategory: LowCategory): void {
    this.catalogService.hideCatalog();
    this.router.navigateByUrl(
      `${this.selectedHighCategoryRoute}/${mediumCategory.route}/${lowCategory.route}`
    );
  }
}
