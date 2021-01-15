import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  catalogVisibility: boolean = false;
  accountManuVisibility: boolean = false;

  ngOnInit(): void {
    this.catalogService.catalogVisibility.subscribe((visibility) => {
      this.catalogVisibility = visibility;
    });
  }

  accountMouseenterHandler(): void {
    this.accountManuVisibility = true;
  }

  accountMouseleaveHandler(): void {
    this.accountManuVisibility = false;
  }

  signup(): void {
    this.userService.showLoginSignupForm(false);
  }

  login(): void {
    this.userService.showLoginSignupForm(true);
  }

  Logout(): void {}
}
