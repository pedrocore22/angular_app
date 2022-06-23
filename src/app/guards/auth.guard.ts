import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('auth') === 'true') {
      return true;
    } else {
      this.router.navigate(['/session']);
      return false;
    }
  }
  
}
