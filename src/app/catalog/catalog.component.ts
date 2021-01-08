import { Component, OnInit } from '@angular/core';
import { HighCategory } from '../models/high-category.model';
import { LowCategory } from '../models/low-category.model';
import { MediumCategory } from '../models/medium-category.model';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  private colCount = 3;

  constructor(private catalogService: CatalogService) {}

  highCategories: HighCategory[];
  mediumCategories: MediumCategory[];
  lowCategories: LowCategory[];

  selectedHighCategoryId: string;
  columnMediumCategories: MediumCategory[][] = [];

  ngOnInit(): void {
    this.catalogService
      .getHighCategories()
      .then((categories: HighCategory[]) => {
        this.highCategories = categories;

        if (categories?.length) this.selectedHighCategoryId = categories[0].id;
      });
    this.catalogService
      .getMediumCategories()
      .then((categories: MediumCategory[]) => {
        this.mediumCategories = categories;
        this.initColumnMediumCategories(this.selectedHighCategoryId);
      });
    this.catalogService.getLowCategories().then((categories: LowCategory[]) => {
      this.lowCategories = categories;
    });
  }

  highCategoryMouseover(highCategoryId: string) {
    this.selectedHighCategoryId = highCategoryId;
    this.initColumnMediumCategories(highCategoryId);
  }

  initColumnMediumCategories(highCategoryId: string): void {
    if (!this.mediumCategories) return;

    const categories = this.mediumCategories.filter(
      (c) => c.highCategoryId == highCategoryId
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

  getLowCategories(mediumCategoryId: string): LowCategory[] {
    if (this.lowCategories) {
      return this.lowCategories.filter(
        (c) => c.mediumCategoryId == mediumCategoryId
      );
    }

    return null;
  }
}
