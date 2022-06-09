import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesDashboardComponent } from './articles/articles-dashboard/articles-dashboard.component';
import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'articles', component: ArticlesDashboardComponent},
  {path: 'create-article', component: CreateArticleComponent },
  {path: 'update-article/:id', component: UpdateArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
