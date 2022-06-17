import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  offersEndpoint: string = 'http://localhost:8080/api/ofertas';

  constructor(private http: HttpClient) { }

  postOffer(offer: any) {
    return this.http.post(this.offersEndpoint, offer)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }


}
