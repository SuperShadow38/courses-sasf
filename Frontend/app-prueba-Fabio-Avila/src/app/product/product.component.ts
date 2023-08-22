import { Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnChanges,
  SimpleChanges, 
  OnInit, 
  DoCheck ,
  OnDestroy 
} from '@angular/core';

import { Product } from '../product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck ,OnDestroy {
  @Input() product: Product;
  @Output() prodcutClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor() {
    console.log('1. constructor');
  }



  ngOnInit() {
    console.log('3. ngOnInit');
    console.log('3. ngOnInit', this.product);
  }

  ngDoCheck() {
    console.log('4. ngDoCheck');
  }
  
  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }

  addCart() {
    console.log('añadir al carrito');
    this.prodcutClicked.emit(this.product.id);
  }
}

export { Product };
