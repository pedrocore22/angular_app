import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cif: new FormControl('', [Validators.required, 
                                Validators.pattern(/([ABCDEFGHPQS])([0-9]{8})/i)]),
      direccion: new FormControl(''),
      localidad: new FormControl(''),
      email: new FormControl('', [Validators.required,
                                  Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])                          
    })
  }

}
