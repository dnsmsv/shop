import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private catalogService: CatalogService) {}

  catalogVisibility: boolean = false;

  ngOnInit(): void {
    this.catalogService.catalogVisibility.subscribe((visibility) => {
      this.catalogVisibility = visibility;
    });
  }

  hideCatalog(): void {
    this.catalogService.hideCatalog();
  }
}
