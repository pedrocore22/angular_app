import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      sku: new FormControl('', [Validators.required, Validators.minLength(4)]),
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      descripcion: new FormControl('')
    })
  }

}
