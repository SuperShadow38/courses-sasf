import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ProductsComponent } from './products/products.component';

import { ContactComponent } from './contact/contact.component';

import { DemoComponent } from './demo/demo.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import { LayoutComponent } from './layout/layout.component';

import {LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';


//import { adminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    
    children: [ 
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },

      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
    
      {
        path: 'products',
        component: ProductsComponent
      },
    
      {
        path: 'products/:id',
        component: ProductDetailComponent
      },
    
      {
        path: 'contact',
        component: ContactComponent
      },

      {
        path: 'login',
        component: LoginComponent
      },
      
      {
        path: 'register',
        component: RegisterComponent
      }
    
    ]
  },

  
  {
    path: 'demo',
    component: DemoComponent
  },

 

  {
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
