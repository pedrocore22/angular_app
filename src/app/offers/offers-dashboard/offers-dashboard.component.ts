import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';
import { OffersService } from 'src/app/services/offers.service';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-offers-dashboard',
  templateUrl: './offers-dashboard.component.html',
  styleUrls: ['./offers-dashboard.component.scss']
})
export class OffersDashboardComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  articles: Array<any> = [];
  vendors: Array<any> = [];
  offers: Array<any> = [];

  constructor(private articlesService: ArticlesService,
              private vendorsService: VendorsService,
              private offersService: OffersService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      articuloTerm: new FormControl(''),
      proveedorTerm: new FormControl('')
    })
    this.searchArticles();
    this.searchVendors();
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

  searchVendors() {
    this.form.get('proveedorTerm')?.valueChanges
             .subscribe((data: any) => {
                if(data.length > 0) {
                  this.vendorsService.searchVendors(data)
                                      .subscribe({
                                        next: (data: any) => {
                                          this.vendors = data;
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


  setSelectedArticle(article: any): void {
    this.offersService.getOffersByArticle(article.id)
                      .subscribe({
                        next: (data: any) => {
                          this.articles = [];
                          this.form.get('articuloTerm')?.setValue('');
                          this.offers = data;
                        },
                        error: (err: any) => {
                          console.log(err);
                        }
                      })
  }

  setSelectedVendor(vendor: any): void {
    this.offersService.getOffersByVendor(vendor.id)
                      .subscribe({
                        next: (data: any) => {
                          this.vendors = [];
                          this.form.get('proveedorTerm')?.setValue('');
                          this.offers = data;
                        },
                        error: (err: any) => {
                          console.log(err);
                        }
                      })
  }

}
