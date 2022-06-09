import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {

  article: any = {};
  id: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.articlesService.getArticleById(this.id)
                        .subscribe({
                          next: (data: any) => {
                            this.article = data.articulo;
                          },
                          error: (err: any) => {
                            console.log(err);
                          }
                        })
  }

}
