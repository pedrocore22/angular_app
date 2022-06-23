import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any = {
    id: '',
    nombre: '',
    apellidos: '',
    email: ''
  }
  private subjectUser: Subject<any> = new Subject<any>();

  authEndpoint: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient,
              private router: Router) { }

  setUser(user: any): any {
    this.user = {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email
    }
    this.subjectUser.next(this.user);
  }  
  
  getUser(): Observable<any> {
    return this.subjectUser.asObservable();
  }

  signUp(user: any) {
    return this.http.post(this.authEndpoint, user)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

  logIn(credentials: any) {
    return this.http.post(this.authEndpoint + '/login', credentials, {withCredentials: true})
                    .pipe(
                      map((res: any) => {
                        this.setUser(res.user);
                        return res;
                      })
                    )
  }

  logOut() {
    localStorage.removeItem('auth');
    this.router.navigate(['/']);
  }

}
