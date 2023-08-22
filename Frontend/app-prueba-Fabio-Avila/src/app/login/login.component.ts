import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ApiService } from '../service/api/api.service';

import { LoginI } from '../models/login.interface';

import { Router } from '@angular/router';

import { ResponseI } from '../models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  constructor(private api:ApiService, private formBuilder : FormBuilder, private router:Router) {
  }


  onLogin() {
    const login = new LoginI(
      this.loginForm.get('usuario')?.value, 
      this.loginForm.get('password')?.value 
    );

    this.api.loginByUsername(login).subscribe({
      next: (data: any) => {
        
          localStorage.setItem("token", data.token);
          this.router.navigate(['/admin/Users']);
        
      },
      error: (error: any) => {
        alert("PROBLEMAS DE INICIO DE SESION" + error.error.message);
      },
      complete: () => {
        // Lógica al completar la suscripción
      }
    });
    
  }
  
  
}




