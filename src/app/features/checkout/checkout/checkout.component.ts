import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../products/services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  cartData : CartItem[] = [];  
  totalCost: number = 0;
  form: FormGroup;
  constructor(private cartService: CartService, private router: Router){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3),]),
      email: new FormControl('', [Validators.required, Validators.email]), 
      address1 : new FormControl('', [Validators.minLength(7), Validators.required]),
      address2 : new FormControl('', [Validators.required]), 
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('',[Validators.minLength(4)]),
      payment: new FormControl('', [Validators.required]),
      cardNum: new FormControl('', [Validators.required, Validators.pattern(/^4[0-9]{15}$/)]),
      expDate: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]),
      cardName: new FormControl('', [Validators.required, Validators.minLength(7), Validators.pattern(/^[a-zA-Z\s]+$/)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}$/)])
    });
  }
  ngOnInit(): void {
    this.cartService.getCart().subscribe(result=>{
      this.cartData = result;
    });
    this.cartService.getTotalCost().subscribe(result=>{
      this.totalCost = result;
    });

 
  this.form.get('payment')?.valueChanges.subscribe(value => {
    const cvvControl = this.form.get('cvv');
    const expDateControl = this.form.get('expDate');
    const cardNumControl = this.form.get('cardNum');
    const cardNameControl = this.form.get('cardName');

    if (value === '1') { // Cash
      cvvControl?.disable();
      expDateControl?.disable();
      cardNumControl?.disable();
      cardNameControl?.disable();
    } else { // Visa
      cvvControl?.enable();
      expDateControl?.enable();
      cardNumControl?.enable();
      cardNameControl?.enable();
    }
  });
}
  increaseQuantity(product: CartItem){
      if(product.quantity < product.product.rating.count){
        this.cartService.increaseQuantity(product);
      }else{
        alert('Your reached max quantity for this product')
      }
  }
  decreaseQuantity(product: CartItem){
    this.cartService.decreaseQuantity(product);
  }
  submitForm(){
    if(this.form.valid){
      console.log(this.form.value);  
      this.cartService.clearCart();
      this.router.navigate(['/products']); 
    }else{
      console.log('invalid:', this.form);
    }
  }
}
