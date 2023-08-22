import { Injectable } from '@angular/core';

import { LoginI } from '../../models/login.interface';

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
}
