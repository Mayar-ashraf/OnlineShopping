import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../products/services/cart.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

export interface CartItem {
  product: any; 
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy{
  cart : CartItem[] = [];
  cartSub !: Subscription;
  totalCost : number = 0;
  
  constructor(private cartService: CartService, private toaster: ToastrService){
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
    });

    this.cartService.getTotalCost().subscribe(result =>{
      this.totalCost = result;
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
  removeItem(product: CartItem){
    this.cartService.removeItem(product);
    this.toaster.success(`Removed Product: ${product.product.title} from Cart!`, "Cart Updated!");
  }
}
