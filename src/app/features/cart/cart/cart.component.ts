import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../products/services/cart.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

export interface CartItem {
  product: any; 
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy{
  cart : CartItem[] = [];
  cartSub !: Subscription;

  constructor(private cartService: CartService){
    console.log('Cart Component Constructor');
  }
  ngOnInit(): void {
    this.cartService.getCart().subscribe(result =>{
      // console.log('From Cart Component :', result);
      this.cart = result;
    });

    this.cartService.getCartHistory().subscribe(result =>{
      if(!this.cart && result){
        this.cart = JSON.parse(result);
      }
    })
  }
  ngOnDestroy(): void {
    if(this.cartSub){
      this.cartSub.unsubscribe();
    }
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
}
