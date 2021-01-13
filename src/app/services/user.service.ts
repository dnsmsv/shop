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

  get loginSignupVisibility() {
    return this._loginSignupVisibility;
  }

  showLoginSignupForm(): void {
    this.loginSignupVisibility.next(true);
  }

  hideLoginSignupForm(): void {
    this.loginSignupVisibility.next(false);
  }
}
