import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  isAdminUser: boolean;
  isCreadorUser: boolean;
  isConsumidorUser: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.isAdminUser = this.authService.isAdmin();
    this.isCreadorUser = this.authService.isCreador();
    this.isConsumidorUser = this.authService.isConsumidor();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigate(['/login']);
  }
  

  logout() {
    this.authService.logout();
  } 
  
}
