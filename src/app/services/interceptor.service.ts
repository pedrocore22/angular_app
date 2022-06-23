import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private http: HttpClient,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.match(/8080\//)) {
      return this.http.get('http://localhost:3000/users/check', {withCredentials: true})
                      .pipe(
                        switchMap((resp: any) => {
                          return next.handle(req);
                        }),
                        catchError((error: any) => {
                          this.router.navigate(['/session']);
                          return next.handle(error);
                        })
                      ) 
    }
    return next.handle(req);
  }

}
