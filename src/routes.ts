import { Routes } from '@angular/router';
import { FavoritesComponent } from './app/favorites/favorites.component';
import { MainComponent } from './app/main/main.component';

export const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '*', redirectTo: '/main', pathMatch: 'full' },
];
