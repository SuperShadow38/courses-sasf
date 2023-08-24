import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


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
    // console.log('Token eliminado del local storage');
    this.router.navigate(['/home']); 
  }
  
  
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  hasRole(role: string): boolean {
    if (!this.isAuthenticated) {
      return false;
    }

    const token = localStorage.getItem(this.tokenKey);

    if (token) { // Verificar si el token no es nulo
      const userRoles = this.getRolesFromToken(token);
      return userRoles.includes(role);
    }
    
    return false;
  }

 

  private decodeJwtToken(token: string): any {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  private getRolesFromToken(token: string): string[] {
    // Decodifica el token JWT para obtener los roles (esto puede variar según tu implementación)
    const decodedToken = this.decodeJwtToken(token);
    if (decodedToken && decodedToken.roles) {
      return decodedToken.roles;
    }
    
    return [];
  }

  isAdmin(): boolean {
    const isAdmin = this.hasRole('ROLE_ADMIN');
    console.log('isAdmin:', isAdmin);
    return isAdmin;
  }
  

  isCreador(): boolean {
    return this.hasRole('ROLE_CREADOR');
  }

  isConsumidor(): boolean {
    return this.hasRole('ROLE_CONSUMIDOR');
  }

  

}
