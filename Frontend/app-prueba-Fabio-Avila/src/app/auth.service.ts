import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private isAuthenticated: boolean = false;
    private tokenKey = 'auth_token';
  
    constructor(private router: Router) {
      this.checkAuthentication();
    }
  
    private checkAuthentication() {
      if (localStorage.getItem(this.tokenKey)) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }
  
    login() {
      this.isAuthenticated = true; 
    }
  
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    }
  
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('token'); // Eliminar el token del local storage
      this.router.navigate(['/home']); // Redirigir al componente de inicio después del logout
    }
  
    isLoggedIn(): boolean {
      return this.isAuthenticated;
    }
  }
  

