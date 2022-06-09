import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  @Input() article: any = {};
  @Input() saveMode: string = '';

  constructor(private articlesService: ArticlesService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      sku: new FormControl('', [Validators.required, Validators.minLength(4)]),
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      genero: new FormControl('Mujer'),
      descripcion: new FormControl('')
    })
  }

  ngOnChanges() {
    this.form.patchValue(this.article);
  }

  saveArticulo(): void {
    this.isLoading = true;
    if (this.saveMode === 'update') {
      this.articlesService.putArticle(this.article.id, this.form.value)
                          .subscribe({
                            next: (data: any) => {
                              this.isLoading = false;
                              this.router.navigate(['/articles']);
                            },
                            error: (err: any) => {
                              this.isLoading = false;
                            }
                          })
    } else {
      this.articlesService.postArticle(this.form.value)
                          .subscribe({
                            next: (data: any) => {
                              this.isLoading = false;
                              this.router.navigate(['/articles']);
                            },
                            error: (err: any) => {
                              this.isLoading = false;
                            }
                          })
    }

  }

}
