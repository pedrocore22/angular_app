import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles-dashboard',
  templateUrl: './articles-dashboard.component.html',
  styleUrls: ['./articles-dashboard.component.scss']
})
export class ArticlesDashboardComponent implements OnInit {

  articles: Array<any> = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getArticles()
                        .subscribe({
                          next: (data: any) => {
                            this.articles = data.articulos;
                          },
                          error: (err: any) => {
                            console.log(err);
                          }
                        })
  }

}
