import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isShowValidation: boolean = false;
  isLoading: boolean = false;

  constructor(private vendorsService: VendorsService,
              private toastService: ToastService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cif: new FormControl('', [Validators.required, 
                                Validators.pattern(/([ABCDEFGHPQS])([0-9]{8})/i)]),
      direccion: new FormControl(''),
      localidad: new FormControl(''),
      email: new FormControl('', [Validators.required,
                                  Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/)]),
      telefono: new FormControl('')                                                     
    })
  }

  showValidation() {
    this.isShowValidation = true;
  }

  saveVendor(): void {
    this.isLoading = true;
    this.vendorsService.postVendor(this.form.value)
                       .subscribe({
                         next: (data: any) => {
                           this.isLoading = false;
                           this.toastService.setToastMessages(data.message, 'success');
                           this.router.navigate(['/vendors']);
                         },
                         error: (err: any) => {
                            this.isLoading = false;
                            this.toastService.setToastMessages(err.error.message, 'warning');
                         }
                       })
  }

}
