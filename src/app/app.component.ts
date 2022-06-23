import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users/check', {withCredentials: true})
             .pipe(
                map((resp: any) => {
                  return resp;
                })
             )
             .subscribe({
                next: (data: any) => {
                  this.authService.setUser(data.user);
                  this.router.navigate(['/home']);
                },
                error: (err: any) => {
                  this.router.navigate(['/']);
                }
             })
  }

}
