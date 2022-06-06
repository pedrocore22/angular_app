import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticlesDashboardComponent } from './articles/articles-dashboard/articles-dashboard.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateArticleComponent } from './articles/create-article/create-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesDashboardComponent,
    HeaderNavComponent,
    SideNavComponent,
    CreateArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
