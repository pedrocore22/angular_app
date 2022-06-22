import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  validationMessages: Array<string> = [];
  serverValidation: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
                                  Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/)]),
      password: new FormControl('', [Validators.required,
                                     Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]),
      repitePassword: new FormControl('', [Validators.required])
    })
  }

  setValidationMessages(): void {
    this.validationMessages = [];
    if(this.form.controls['nombre']?.errors?.['required']) {
      this.validationMessages.push('El nombre es obligatorio');
    }
    if(this.form.controls['apellidos']?.errors?.['required']) {
      this.validationMessages.push('Los apellidos son obligatorios');
    }
    if(this.form.controls['email']?.errors?.['required']) {
      this.validationMessages.push('El email es obligatorio');
    }
    if(this.form.controls['email']?.errors?.['pattern']) {
      this.validationMessages.push('El email no es válido');
    }
    if(this.form.controls['password']?.errors?.['required']) {
      this.validationMessages.push('La contraseña es obligatoria');
    }
    if(this.form.controls['password']?.errors?.['pattern']) {
      this.validationMessages.push('La contraseña debe tener al menos una minúscula, una mayúscula y un número');
    }
    if(this.form.get('password')?.value !== 
       this.form.get('repitePassword')?.value) {
      this.validationMessages.push('Las contraseñas no coinciden');
    }
  }

  sendUser(): void {
    const user = {
      nombre: this.form.get('nombre')?.value,
      apellidos: this.form.get('apellidos')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }
    this.authService.signUp(user)
                    .subscribe({
                      next: (data: any) => {
                        this.router.navigate(['/']);
                      },
                      error: (err: any) => {
                        this.serverValidation = true;
                        this.validationMessages = [];
                        this.validationMessages.push(err.error.message);
                      }
                    })
  }

}
