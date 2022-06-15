import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  private vendorsEndpoint = 'http://localhost:8080/api/proveedores';

  constructor(private http: HttpClient) { }

  getVendors(numberPage: number) {
    return this.http.get(this.vendorsEndpoint + '/page/' + numberPage)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

  postVendor(vendor: any) {
    return this.http.post(this.vendorsEndpoint, vendor)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

}
