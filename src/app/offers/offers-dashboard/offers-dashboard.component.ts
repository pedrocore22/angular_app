import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-offers-dashboard',
  templateUrl: './offers-dashboard.component.html',
  styleUrls: ['./offers-dashboard.component.scss']
})
export class OffersDashboardComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  articles: Array<any> = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      articuloTerm: new FormControl('')
    })
    this.searchArticles();
  }

  searchArticles() {
    this.form.get('articuloTerm')?.valueChanges
             .subscribe((data: any) => {
                if(data.length > 0) {
                  this.articlesService.getArticlesByModel(data)
                                      .subscribe({
                                        next: (data: any) => {
                                          this.articles = data.articulos;
                                        },
                                        error: (err: any) => {
                                          console.log(err);
                                        }
                                      })
                } else {
                  this.articles = [];
                }
              })
  }
}
