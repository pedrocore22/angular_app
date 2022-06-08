import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles-dashboard',
  templateUrl: './articles-dashboard.component.html',
  styleUrls: ['./articles-dashboard.component.scss']
})
export class ArticlesDashboardComponent implements OnInit {

  articles: Array<any> = [];
  form: FormGroup = new FormGroup({});
  isSearching: boolean = false;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    // this.articlesService.getArticles()
    //                     .subscribe({
    //                       next: (data: any) => {
    //                         this.articles = data.articulos;
    //                       },
    //                       error: (err: any) => {
    //                         console.log(err);
    //                       }
    //                     })
    this.form = new FormGroup({
      modelTerm: new FormControl('')
    })
    this.onSearchChanges();
  }

  onSearchChanges(): void {
    this.form.valueChanges
             .subscribe((dataForm: any) => {
                if (dataForm.modelTerm.length > 0) {
                  this.isSearching = true;
                  this.articlesService.getArticlesByModel(dataForm.modelTerm)
                                      .subscribe({
                                        next: (data: any) => {
                                          this.isSearching = false;
                                          this.articles = data.articulos;
                                        },
                                        error: (err: any) => {
                                          this.isSearching = false;
                                          console.log(err);
                                        }
                                      })
                } else {
                  this.articles = [];
                }

             })
  }
}