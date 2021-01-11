import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
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
import { DatabaseService } from './services/database.service';
import { MainDiscountsSliderComponent } from './main-discounts-slider/main-discounts-slider.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    SignupFormComponent,
    LoginFormComponent,
    MainComponent,
    AccountComponent,
    OrderlistComponent,
    CatalogMenuComponent,
    SearchFormComponent,
    CatalogComponent,
    MainDiscountsSliderComponent,
    ProductsComponent,
    ProductComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
