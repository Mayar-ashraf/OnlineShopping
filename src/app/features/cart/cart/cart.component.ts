import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../products/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy{
  cart : any[] = [];
  cartSub !: Subscription;

  constructor(private cartService: CartService){
    console.log('Cart Component Constructor');
  }
  ngOnInit(): void {
    this.cartService.getCart().subscribe(result =>{
      console.log('From Cart Component :', result);
      this.cart = result;
    });
  }
  ngOnDestroy(): void {
    if(this.cartSub){
      this.cartSub.unsubscribe();
    }
  }
}
