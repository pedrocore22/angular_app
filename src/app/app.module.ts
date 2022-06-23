import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticlesDashboardComponent } from './articles/articles-dashboard/articles-dashboard.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';
import { ArticleFormComponent } from './articles/article-form/article-form.component';
import { ToastComponent } from './toast/toast.component';
import { VendorsDashboardComponent } from './vendors/vendors-dashboard/vendors-dashboard.component';
import { VendorFormComponent } from './vendors/vendor-form/vendor-form.component';
import { CreateVendorComponent } from './vendors/create-vendor/create-vendor.component';
import { OffersDashboardComponent } from './offers/offers-dashboard/offers-dashboard.component';
import { Pantalla404Component } from './pantalla404/pantalla404.component';
import { CreateOfferComponent } from './offers/create-offer/create-offer.component';
import { OfferFormComponent } from './offers/offer-form/offer-form.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PricesPipe } from './pipes/prices.pipe';
import { InterceptorService } from './services/interceptor.service';
import { SessionComponent } from './session/session.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesDashboardComponent,
    HeaderNavComponent,
    SideNavComponent,
    CreateArticleComponent,
    SpinnerComponent,
    UpdateArticleComponent,
    ArticleFormComponent,
    ToastComponent,
    VendorsDashboardComponent,
    VendorFormComponent,
    CreateVendorComponent,
    OffersDashboardComponent,
    Pantalla404Component,
    CreateOfferComponent,
    OfferFormComponent,
    SignupComponent,
    LoginComponent,
    PricesPipe,
    SessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
