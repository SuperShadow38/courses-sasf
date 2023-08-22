import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../../core/services/products/products.service';

import { Product } from './../../../product/product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  displayedColumns: string[] = ['id', 'name', 'Username', 'email', 'actions'];

  constructor(
    private productsService:ProductsService
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit() {
    this.fetchProducts();
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
}
