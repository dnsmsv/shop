import { Routes } from '@angular/router';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { MainComponent } from './app/main/main.component';
import { SignupFormComponent } from './app/signup-form/signup-form.component';

export const appRoutes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];
