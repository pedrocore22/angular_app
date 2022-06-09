import { Component, OnInit } from '@angular/core';
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
  messageToast: string = '';
  classToast: string = '';
  isShowToast: boolean = false;

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

  createArticulo(): void {
    this.isLoading = true;
    this.articlesService.postArticle(this.form.value)
                        .subscribe({
                          next: (data: any) => {
                            this.isLoading = false;
                            this.setToastValues('success', data.message);
                            this.isShowToast = true;
                            const timer = setTimeout(() => {
                              this.isShowToast = false;
                              this.router.navigate(['/articles']);
                            }, 4000)
                          },
                          error: (err: any) => {
                            this.isLoading = false;
                            this.setToastValues('warning', err.error.message);
                            this.isShowToast = true;
                            const timer = setTimeout(() => {
                              this.isShowToast = false;
                            }, 4000)
                          }
                        })
  }

  setToastValues(type: string, message: string): void {
    this.classToast = type;
    this.messageToast = message;
  }

}
