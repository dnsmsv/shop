import { Routes } from '@angular/router';
import { MainComponent } from './app/main/main.component';

export const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '*', redirectTo: '/main', pathMatch: 'full' },
];
