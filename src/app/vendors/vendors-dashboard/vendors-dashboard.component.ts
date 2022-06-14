import { Component, OnInit } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-vendors-dashboard',
  templateUrl: './vendors-dashboard.component.html',
  styleUrls: ['./vendors-dashboard.component.scss']
})
export class VendorsDashboardComponent implements OnInit {


  vendors: Array<any> = [];

  constructor(private vendorsService: VendorsService) { }

  ngOnInit(): void {
    this.vendorsService.getVendors()
                       .subscribe({
                         next: (data: any) => this.vendors = data,
                         error: (err: any) => console.log(err)
                       })
  }

}
