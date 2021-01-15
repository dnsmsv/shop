import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loginSignupVisibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor() {}

  login: boolean = true;

  get loginSignupVisibility() {
    return this._loginSignupVisibility;
  }

  get user(): BehaviorSubject<User> {
    return this._user;
  }

  setUser(user: User) {
    this._user.next(user);
  }

  showLoginSignupForm(login: boolean): void {
    this.login = login;
    this.loginSignupVisibility.next(true);
  }

  hideLoginSignupForm(): void {
    this.loginSignupVisibility.next(false);
  }
}
