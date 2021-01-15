import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrls: ['./login-signup-form.component.scss'],
})
export class LoginSignupFormComponent implements OnInit {
  constructor(private userService: UserService) {
    this.isLogin = userService.login;
  }

  isLogin: boolean = true;
  name: string;
  email: string;
  password: string;
  @ViewChild('container') container: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  ngOnInit(): void {}

  selectSignup(): void {
    this.isLogin = false;
  }

  selectLogin(): void {
    this.isLogin = true;
  }

  signup(): void {}

  login(): void {}

  close(event: MouseEvent): void {
    if (
      event.target === this.container.nativeElement ||
      event.target === this.closeBtn.nativeElement
    ) {
      this.userService.hideLoginSignupForm();
    }
  }
}
