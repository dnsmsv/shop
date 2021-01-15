import { Component, OnInit } from '@angular/core';
import { CatalogService } from './services/catalog.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  title = 'shop';
  visibility: boolean = false;

  ngOnInit(): void {
    this.userService.loginSignupVisibility.subscribe(
      (visibility) => (this.visibility = visibility)
    );
  }

  hideCatalog(): void {
    this.catalogService.hideCatalog();
  }
}
