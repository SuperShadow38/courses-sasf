import { Injectable } from '@angular/core';

import { LoginI } from '../../models/login.interface';

import { Product } from './../../product.model';

import { ResponseI } from '../../models/response.interface';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


const token = "Bearer "+localStorage.getItem("authToken");
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:8005/';

  
  constructor(private http:HttpClient) { }

  
  loginByUsername(form:LoginI):Observable<ResponseI>{
    const direccion = this.url + 'auth/login';
    return this.http.post<ResponseI>(direccion,form);
  }

  registerUser(newUser: Product): Observable<ResponseI> {
    const direccion = this.url + 'usuarios';
    return this.http.post<ResponseI>(direccion, newUser);
  }
}
