import { Component, OnInit } from '@angular/core';
import { AlertType } from '../models/alert-type';
import { User } from '../models/user.model';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
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
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  catalogVisibility: boolean = false;
  accountManuVisibility: boolean = false;
  userName: string;

  ngOnInit(): void {
    this.catalogService.catalogVisibility.subscribe((visibility) => {
      this.catalogVisibility = visibility;
    });
    this.userService.user.subscribe((user) => (this.userName = user?.name));
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

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      this.alertService.show(error.message, AlertType.Error);
    }
  }
}
