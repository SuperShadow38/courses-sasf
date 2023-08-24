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

  fetchProducts() {
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products;

      // Filtrar usuarios según el rol y el estado
      if (this.authService.hasRole('ROLE_CREADOR') || this.authService.hasRole('ROLE_CONSUMIDOR')) {
        this.products = this.products.filter(product => product.estadoUsuario === 'ACTIVO');
      }
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

  isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }
}
