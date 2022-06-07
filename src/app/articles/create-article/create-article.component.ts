import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  form: FormGroup = new FormGroup({});

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
    this.articlesService.postArticle(this.form.value)
                        .subscribe({
                          next: (data: any) => {
                            this.router.navigate(['/articles']);
                          },
                          error: (err: any) => {
                            console.log(err);
                          }
                        })
  }

}
