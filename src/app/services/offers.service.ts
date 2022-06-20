import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  offersEndpoint: string = 'http://localhost:8080/api/ofertas';

  constructor(private http: HttpClient) { }

  getOffersByArticle(articuloId: string) {
    return this.http.get(this.offersEndpoint + '/articulo/' + articuloId)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )                    
  }

  getOffersByVendor(proveedorId: string) {
    return this.http.get(this.offersEndpoint + '/proveedor/' + proveedorId)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )                    
  }

  getOffersByArticleAndVendor(articuloId: string, proveedorId: string) {
    return this.http.get(this.offersEndpoint + 
                         '/articulo-proveedor/' + 
                         articuloId + '/' +
                         proveedorId)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )                    
  }

  postOffer(offer: any) {
    return this.http.post(this.offersEndpoint, offer)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }


}
