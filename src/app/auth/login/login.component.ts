import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  validationMessages: Array<string> = [];
  serverValidation: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,
                                  Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/)]),
      password: new FormControl('', [Validators.required,
                                     Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]),
    })
  }

  setValidationMessages(): void {
    this.validationMessages = [];
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
  }

  sendCredentials() {
    this.authService.logIn(this.form.value)
                    .subscribe({
                      next: (data: any) => {
                        this.router.navigate(['/home']);
                      },
                      error: (err: any) => {
                        this.serverValidation = true;
                        this.validationMessages = [];
                        this.validationMessages.push(err.error.message);
                      }
                    })
  }

}
