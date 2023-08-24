import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from './../core/services/products/products.service';
import { MyValidators } from './../utils/validators';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.buildForm();
  }


  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.productsService.getProduct(this.id).subscribe(product => {
        this.form.patchValue(product);
      });
    });
  }

  saveUser(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product).subscribe((newproduct) => {
        console.log(newproduct);
        this.router.navigate(['./admin/Users']);
      });
    }
    console.log(this.form.value);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      Username: ['', [Validators.required, MyValidators.isUsernameValid]],
      email: ['', [Validators.required]]
    });
  }

  get UsernameField() {
    return this.form.get('Username');
  }
}
