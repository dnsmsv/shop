import { Component } from '@angular/core';
import { CatalogService } from './services/catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private catalogService: CatalogService) {}

  title = 'shop';

  hideCatalog(): void {
    this.catalogService.hideCatalog();
  }
}
