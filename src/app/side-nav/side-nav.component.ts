import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @ViewChild('aside') asideRef: ElementRef = new ElementRef({});

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleAsideNav(): void {
    this.asideRef.nativeElement.classList.toggle('open');
  }

  navToComponent(path: string): void {
    if(this.asideRef.nativeElement.classList.contains('open')) {
      this.asideRef.nativeElement.classList.remove('open');
    }
    this.router.navigate([path]);
  }

}
