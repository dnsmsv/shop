import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertType } from '../models/alert-type';
import { User } from '../models/user.model';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrls: ['./login-signup-form.component.scss'],
})
export class LoginSignupFormComponent implements OnInit, OnDestroy {
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.isLogin = userService.login;
  }

  isLogin: boolean = true;
  name: string;
  email: string;
  password: string;
  authorized: boolean = false;
  @ViewChild('container') container: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  ngOnInit(): void {
    this.userService.user.subscribe((user) => (this.authorized = user != null));
  }

  ngOnDestroy(): void {
    this.userService.user.unsubscribe();
  }

  selectSignup(): void {
    this.isLogin = false;
  }

  selectLogin(): void {
    this.isLogin = true;
  }

  async signup(): Promise<void> {
    try {
      const user = new User(this.name, this.email);
      await this.authService.signUp(user, this.password);
      this.userService.hideLoginSignupForm();
    } catch (error) {
      this.alertService.show(error.message, AlertType.Error);
    }
  }

  async login(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      this.userService.hideLoginSignupForm();
    } catch (error) {
      this.alertService.show(error.message, AlertType.Error);
    }
  }

  close(event: MouseEvent): void {
    if (
      event.target === this.container.nativeElement ||
      event.target === this.closeBtn.nativeElement
    ) {
      this.userService.hideLoginSignupForm();
    }
  }
}
