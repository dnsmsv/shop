import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loginSignupVisibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  login: boolean = true;

  get loginSignupVisibility() {
    return this._loginSignupVisibility;
  }

  showLoginSignupForm(login: boolean): void {
    this.login = login;
    this.loginSignupVisibility.next(true);
  }

  hideLoginSignupForm(): void {
    this.loginSignupVisibility.next(false);
  }
}
