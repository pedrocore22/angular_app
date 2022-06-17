import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  articles: Array<any> = [];
  selectedArticle: any = {};
  vendors: Array<any> = [];

  constructor(private articulosService: ArticlesService,
              private vendorsService: VendorsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      articuloTerm: new FormControl(''),
      articulo: new FormGroup({
        marca: new FormControl(''),
        modelo: new FormControl(''),
        genero: new FormControl('')
      }),
      proveedorTerm: new FormControl('')
    })
    this.searchArticles();
    this.searchVendors();
  }

  searchArticles() {
    this.form.get('articuloTerm')?.valueChanges
             .subscribe((data: any) => {
               if (data.length > 0) {
                this.articulosService.getArticlesByModel(data)
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

  setSelectedArticle(article: any): void {
    this.selectedArticle = article;
    this.articles = [];
    this.form.controls['articuloTerm'].setValue('');
    this.form.controls['articulo'].patchValue(article);
  }

  searchVendors() {
    this.form.get('proveedorTerm')?.valueChanges
             .subscribe((data: any) => {
              if (data.length > 0) {
                this.vendorsService.searchVendors(data)
                                   .subscribe({
                                    next: (res: any) => {
                                      this.vendors = res;
                                    },
                                    error: (err: any) => {
                                      console.log(err);
                                    }
                                   })
              } else {
                this.vendors = [];
              }
             })
  }

}
