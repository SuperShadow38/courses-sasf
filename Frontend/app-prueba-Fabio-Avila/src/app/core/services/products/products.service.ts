import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


import { Product } from './../../../product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from  './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
 constructor (
  private http: HttpClient
 ) {}

 getAllProducts() {
  const url = environment.url_api;
  return this.http.get<Product[]>("http://localhost:8005/usuarios");
}

getProduct(id: string): Observable<Product> {
  const url = `${environment.url_api}/${id}`;
  
  return this.http.get<Product>(url).pipe(
    catchError(error => {
      console.error('Error al obtener el usuario:', error);
      return throwError('Ocurrió un error al obtener el usuario.');
    }), 
  );
}

createProduct(product: Product) {
  return this.http.post(environment.url_api, product);
}

updateProduct(id: string, changes: Partial<Product>) {
  return this.http.put<Product>(`${environment.url_api}/${id}`, changes);
}

deleteProduct(id: string) {
  return this.http.delete(`${environment.url_api}/${id}`);
}



}
