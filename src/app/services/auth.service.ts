import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authEndpoint: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  signUp(user: any) {
    return this.http.post(this.authEndpoint, user)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

  logIn(credentials: any) {
    return this.http.post(this.authEndpoint + '/login', credentials)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

}
