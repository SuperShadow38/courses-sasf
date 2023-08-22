import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';

import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-form-Users',
  templateUrl: './form-Users.component.html',
  styleUrls: ['./form-Users.component.scss'],
  
})
export class FormUsersComponent implements OnInit {
  
  form: FormGroup;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) { 
    this.buildForm();
   }


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit() {

  }

  saveUser(event: Event) {
    event.preventDefault();

    if(this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product).subscribe((newproduct) => {
        console.log(newproduct);
        this.router.navigate(['./admin/Users']);
      });
    }
    console.log(this.form.value);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      Username: ['', [Validators.required, MyValidators.isUsernameValid]],
      email: ['', [Validators.required]]
    });
  }

  get UsernameField() {
    return this.form.get('Username');
  }
}
