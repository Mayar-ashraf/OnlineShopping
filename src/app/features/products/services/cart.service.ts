import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  product: any; 
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<CartItem[]>([]);
  totalCount = new BehaviorSubject<number>(0);
  constructor() { }
  addToCart(product : any){
    //console.log(typeof this.cart);
    const index = this.cart.value.findIndex(item => item.product.id === product.id);
    if(index >= 0){
      const updatedCart = [...this.cart.value]; // make a shallow copy --> to allow listening to the change
      updatedCart[index].quantity += 1;
      this.cart.next(updatedCart);
    }else{
      this.cart.next([...this.cart.value, { product, quantity: 1 }]);
    }
    this.totalCount.next(this.totalCount.value + 1);
  }

  getCart():Observable<Array<Object>>{
    return this.cart.asObservable();
  }
  getProductsCount():Observable<number>{
    return this.totalCount.asObservable();
  }

}
