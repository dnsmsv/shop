import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss'],
})
export class CatalogMenuComponent implements OnInit, OnDestroy {
  constructor(private catalogService: CatalogService) {}

  opened: boolean = false;

  ngOnInit(): void {
    this.catalogService.catalogVisibility.subscribe((visibility) => {
      this.opened = visibility;
    });
  }

  ngOnDestroy(): void {
    this.catalogService.catalogVisibility.unsubscribe();
  }

  showCatalogMenu() {
    this.catalogService.showCatalog();
  }

  hideCatalogMenu() {
    this.catalogService.hideCatalog();
  }
}
