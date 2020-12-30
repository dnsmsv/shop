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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
