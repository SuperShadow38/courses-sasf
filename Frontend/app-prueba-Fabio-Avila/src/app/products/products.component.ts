import { Component, OnInit } from '@angular/core';

import { Product } from './../product.model';

import { ProductsService } from './../core/services/products/products.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit  {

  
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }
  
  clickProduct(id: number) {
    console.log('product');
    console.log(id);
}

  fetchProducts() {
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(rta => {
      console.log(rta);
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();  
  }

}
