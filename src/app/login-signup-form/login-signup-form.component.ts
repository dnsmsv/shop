import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrls: ['./login-signup-form.component.scss'],
})
export class LoginSignupFormComponent implements OnInit {
  constructor(private userService: UserService) {}

  visibility: boolean;

  ngOnInit(): void {
    this.userService.loginSignupVisibility.subscribe(
      (visibility) => (this.visibility = visibility)
    );
  }
}
