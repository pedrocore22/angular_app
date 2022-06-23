import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  user: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser()
                    .subscribe((data: any) => {
                      this.user = data;
                    })
  }

  logOut() {
    this.authService.logOut();
  }

}
