import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormComponent } from './components/product-form/product-form.component';

import { NavComponent } from './components/nav/nav.component';

import { ProductsListComponent } from './components/products-list/products-list.component';

import { FormUsersComponent } from './components/form-Users/form-Users.component';

import { ProductEditComponent } from './components/product-edit/ProductEditComponent';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'create',
        component: ProductFormComponent
      },
      
      {
        path: 'Users',
        component: ProductsListComponent
      },

      {
        path: 'Users/create',
        component: FormUsersComponent
      },

      {
        path: 'Users/edit/:id',
        component: ProductEditComponent
      },
      
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
