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
  articleSelected: any = null;
  vendors: Array<any> = [];
  vendorSelected: any = null;
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
    this.articleSelected = article;
    this.articles = [];
    this.form.get('articuloTerm')?.setValue('');
    this.searchOffers();
  }

  setSelectedVendor(vendor: any): void {
    this.vendorSelected = vendor;
    this.vendors = [];
    this.form.get('proveedorTerm')?.setValue('');
    this.searchOffers();
  }

  searchOffers() {
    if (this.articleSelected !== null &&
        this.vendorSelected !== null) {
      this.offersService.getOffersByArticleAndVendor(this.articleSelected.id,
                                                     this.vendorSelected.id)
                        .subscribe({
                          next: (data: any) => {
                            this.offers = data;
                          },
                          error: (err: any) => {
                            console.log(err);
                          }
                        })
    } else if (this.articleSelected !== null) {
      this.offersService.getOffersByArticle(this.articleSelected.id)
                        .subscribe({
                          next: (data: any) => {
                            this.offers = data;
                          },
                          error: (err: any) => {
                            console.log(err);
                          }
                        })
    } else if (this.vendorSelected !== null) {
      this.offersService.getOffersByVendor(this.vendorSelected.id)
                        .subscribe({
                          next: (data: any) => {
                            this.offers = data;
                          },
                          error: (err: any) => {
                            console.log(err);
                          }
                        })
    } else {
      this.offers = []; // All credits to Manuel :)
    }
  }

  clearSelectedArticle(): void {
    this.articleSelected = null;
    this.searchOffers();
  }

  clearSelectedVendor(): void {
    this.vendorSelected = null;
    this.searchOffers();
  }

}
