import { Routes } from '@angular/router';
import { FavoritesComponent } from './app/favorites/favorites.component';
import { MainComponent } from './app/main/main.component';
import { OrderlistComponent } from './app/orderlist/orderlist.component';
import { SearchResultComponent } from './app/search-result/search-result.component';

export const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'orderlist', component: OrderlistComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '*', redirectTo: '/main', pathMatch: 'full' },
];
