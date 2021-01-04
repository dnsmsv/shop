import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss'],
})
export class CatalogMenuComponent implements OnInit {
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {}

  openCatalogMenu() {
    this.databaseService.postImg();
  }
}
