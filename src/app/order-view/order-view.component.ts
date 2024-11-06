import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Order } from '../models/order';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    if (email) {
      const parts = email.split('@');
      const hasValidDomain = email.endsWith('.com');
      const doesNotStartWithNumber = isNaN(parseInt(email[0], 10));
      if (parts.length === 2 && parts[0].length >= 4 && parts[1].length >= 4 && hasValidDomain && doesNotStartWithNumber) {
        return null;
      }
    }
    return { customEmail: true };
  };
}
@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})





export class OrderViewComponent implements OnInit {
  orderForm: FormGroup;
name?:string="sam";
price?:number=0;
oneProduct: Product={};
orderStatus: boolean = false;

constructor(private ac: ActivatedRoute, private productService: ProductsService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar ) {
  this.orderForm = this.fb.group({
    pname: [''],
    pprice: [''],

    
    name: ['', [Validators.required, Validators.minLength (2)]],
    email: ['', [Validators.required, Validators.email, customEmailValidator()]],
    contact: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    quantity: [1, [Validators.required, Validators.min(1)]],  

  });

  
}

ngOnInit(): void {
  this.ac.paramMap.subscribe((a) => {
    const productId = a.get("id") ?? '0';
    this.productService.getProductById(+productId).subscribe((data) => {
      this.oneProduct = data;

      this.name = this.oneProduct?.name;
      this.price = this.oneProduct?.price;
      this.orderForm.patchValue({
        pname: this.name,
        pprice: this.price,
      });
    });
  });
}

addOrder() {
 
  if (this.orderForm.valid) {
 this._snackBar.open('The order has been placed!', 'success',{
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
    const order: Order = this.orderForm.value;
    this.productService.addOrder(order).subscribe(
      response => {
        console.log('Order placed successfully:', response);
       
        
        this.orderForm.reset();
      },
      error => {
        console.error('Error placing order:', error);
      }
    );
  }
}
confirmCheck(){
  if(!this.orderStatus){
    let prompt = confirm("Want to leave without placing your order?");
    return prompt;

  }
  else{
    return true;
  }
}



}