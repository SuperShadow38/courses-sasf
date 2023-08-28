import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ApiService } from '../service/api/api.service';

import { LoginI } from '../models/login.interface';

import { Router } from '@angular/router';

import { ResponseI } from '../models/response.interface';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  showAlert: boolean = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  constructor(private api:ApiService, private formBuilder : FormBuilder, private router:Router, private authService:AuthService) {
  }


  onLogin() {
    const login = new LoginI(
      this.loginForm.get('usuario')?.value,
      this.loginForm.get('password')?.value
    );
  
    this.api.loginByUsername(login).subscribe({
      next: (data: any) => {
        localStorage.setItem("token", data.token);
        this.authService.setAuthenticated(true); // Cambiar el estado de autenticación
        this.router.navigate(['/home']); // Redirigir al componente de inicio
      },
      error: (error: any) => {
        this.showAlert = true;
      },
      complete: () => {
        // Lógica al completar la suscripción
      }
    });
  }
  
}




