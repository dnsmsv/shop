import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainDiscountsSliderComponent } from './main-discounts-slider/main-discounts-slider.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { LoginSignupFormComponent } from './login-signup-form/login-signup-form.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountComponent } from './discount/discount.component';
import { AlertComponent } from './alert/alert.component';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { OrderComponent } from './order/order.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MainMenuComponent,
    MainComponent,
    AccountComponent,
    OrderlistComponent,
    CatalogMenuComponent,
    SearchFormComponent,
    CatalogComponent,
    MainDiscountsSliderComponent,
    ProductsComponent,
    ProductComponent,
    LoginSignupFormComponent,
    DiscountsComponent,
    DiscountComponent,
    FavoritesComponent,
    OrderComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [AuthService, AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
