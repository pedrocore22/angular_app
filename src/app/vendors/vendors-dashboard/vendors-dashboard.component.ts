import { Component, OnInit } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-vendors-dashboard',
  templateUrl: './vendors-dashboard.component.html',
  styleUrls: ['./vendors-dashboard.component.scss']
})
export class VendorsDashboardComponent implements OnInit {

  pageState: any = {
    currentNumberPage: 0,
    lastPage: null,
    isFirstPage: true,
    isLastPage: false
  }
  isLoading: boolean = false;
  vendors: Array<any> = [];

  constructor(private vendorsService: VendorsService) { }

  ngOnInit(): void {
    this.getVendors(this.pageState.currentNumberPage);
  }

  getVendors(numberPage: number): void {
    this.isLoading = true;
    this.vendorsService.getVendors(numberPage)
                       .subscribe({
                         next: (data: any) => {
                           this.vendors = data.content;
                           this.pageState.lastPage = data.totalPages - 1;
                           this.pageState.isFirstPage = data.first;
                           this.pageState.isLastPage = data.last;
                           this.isLoading = false;
                         },
                         error: (err: any) => {
                           console.log(err);
                           this.isLoading = false;
                          }
                       })
  }

  firstPage() {
    this.pageState.currentNumberPage = 0;
    this.getVendors(this.pageState.currentNumberPage);
  }

  previousPage() {
    this.pageState.currentNumberPage--;
    this.getVendors(this.pageState.currentNumberPage);
  }

  nextPage() {
    this.pageState.currentNumberPage++;
    this.getVendors(this.pageState.currentNumberPage);
  }

  lastPage() {
    this.pageState.currentNumberPage = this.pageState.lastPage;
    this.getVendors(this.pageState.currentNumberPage);
  }

}
