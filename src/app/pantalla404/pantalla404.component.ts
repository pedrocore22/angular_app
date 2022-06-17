import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-pantalla404',
  templateUrl: './pantalla404.component.html',
  styleUrls: ['./pantalla404.component.scss']
})
export class Pantalla404Component implements OnInit {

  urlPic: string = '';
  endpointAPI: string = 'https://dog.ceo/api/breeds/image/random';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.endpointAPI)
             .pipe(
              map((res: any) => {
                return res;
              })
             )
             .subscribe({
                next: (data: any) => {
                  this.urlPic = data.message;
                },
                error: (err: any) => {
                  console.log(err);
                }
             })
  }

}
