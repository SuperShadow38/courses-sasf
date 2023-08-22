import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../core/services/products/products.service';

import { Product } from './../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.fetchProduct(id);
    });
  
    this.fetchAllProducts(); 
  }
  
  fetchProduct(id: string) {
    this.productsService.getProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  

  fetchAllProducts() {
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  createProduct() {
    const newProduct: Product = {
      id: 14,
      usuario: "fabio",
      clave: "password123",
      email: "fabioavila@example.com",
      estadoUsuario: '',
      nombre_de_usuario: '',
      apellido_de_usuario: ''
    };

    this.productsService.createProduct(newProduct).subscribe((product) => {
      const newProductData = product as Product; // Casting explícito a tipo Product
      this.products.push(newProductData);
      this.fetchAllProducts();
      console.log(newProductData); // Obtener nuevamente todos los productos después de crear uno nuevo
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      id: 9,
      usuario: "fabio",
      clave: "password123",
      email: "fabioavila@example.com",
      estadoUsuario: ''
    };
    this.productsService.updateProduct('2',updateProduct).subscribe(product => {
      console.log(product);
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct('10').subscribe(rta => {
      console.log(rta);
    });
  }
}