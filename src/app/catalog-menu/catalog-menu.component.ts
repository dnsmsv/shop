import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss'],
})
export class CatalogMenuComponent implements OnInit {
  constructor(private catalogService: CatalogService) {}

  opened: boolean = false;

  ngOnInit(): void {
    this.catalogService.catalogVisibility.subscribe((visibility) => {
      this.opened = visibility;
      console.log(visibility);
    });
  }

  showCatalogMenu() {
    this.catalogService.showCatalog();
  }

  hideCatalogMenu() {
    this.catalogService.hideCatalog();
  }
}
