import { Routes } from '@angular/router';
import { FavoritesComponent } from './app/favorites/favorites.component';
import { MainComponent } from './app/main/main.component';
import { OrderlistComponent } from './app/orderlist/orderlist.component';

export const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'orderlist', component: OrderlistComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '*', redirectTo: '/main', pathMatch: 'full' },
];
