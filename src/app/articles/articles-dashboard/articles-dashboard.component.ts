import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles-dashboard',
  templateUrl: './articles-dashboard.component.html',
  styleUrls: ['./articles-dashboard.component.scss']
})
export class ArticlesDashboardComponent implements OnInit {

  @ViewChild('search') searchInputRef: ElementRef = new ElementRef({});
  @ViewChild('overlay') overlayRef: ElementRef = new ElementRef({});
  articles: Array<any> = [];
  form: FormGroup = new FormGroup({});
  isSearching: boolean = false;
  articleIndex: number = 0;

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

  // Hook que garantiza que todos los elementos del DOM
  // estén renderizados

  ngAfterViewInit() {
    this.searchInputRef.nativeElement.focus();
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

  toggleModal() {
    // Just for fun :)
    if (this.overlayRef.nativeElement.classList.contains('display')) {
      this.overlayRef.nativeElement.classList.toggle('open');
      setTimeout(() => {
        this.overlayRef.nativeElement.classList.toggle('display');
      }, 600);
    } else {
      this.overlayRef.nativeElement.classList.toggle('display');
      setTimeout(() => {
        this.overlayRef.nativeElement.classList.toggle('open');
      }, 100); 
    }
  }

  showArticle(index: number): void {
    this.articleIndex = index;
    this.toggleModal();
  }

}