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
  history = new BehaviorSubject<string | null>(localStorage.getItem('cartHistory'));
  constructor() {
    const savedCart = localStorage.getItem('cartHistory');
    if (savedCart) {
      const parsedCart : CartItem[] = JSON.parse(savedCart);
      this.cart.next(parsedCart);
      // Calculate totalCount from parsedCart
      const count = parsedCart.reduce((acc, item) => acc + item.quantity, 0);
      this.totalCount.next(count);
      this.history.next(savedCart);
    }
}
  addToCart(product: any) {
    const index = this.cart.value.findIndex(item => item.product.id === product.id);
    if (index >= 0) {
      const updatedCart = [...this.cart.value]; // make a shallow copy --> to allow listening to the change
      updatedCart[index].quantity += 1;
      this.cart.next(updatedCart);
    } else {
      this.cart.next([...this.cart.value, { product, quantity: 1 }]);
    }
    this.totalCount.next(this.totalCount.value + 1);
    this.updateHistory(JSON.stringify(this.cart.value));
  }

  getCart(): Observable<Array<CartItem>> {
    return this.cart.asObservable();
  }

  getProductsCount(): Observable<number> {
    return this.totalCount.asObservable();
  }

  getCartHistory(): Observable<string | null>{
    return this.history.asObservable();
  }

  updateHistory(newHistory: string) {
    console.log('historyyy updated');
    
    localStorage.setItem('cartHistory', newHistory);
    this.history.next(newHistory);
  }
  clearHistory(){
    localStorage.clear();
  }

  decreaseQuantity(item: CartItem) {
    console.log('decreaseQuantity from Cart Service');
    let updatedCart;
    let updatedCount = this.totalCount.value - 1;

    if(item.quantity > 1){

      updatedCart = this.cart.value.map(pdt=> pdt?.product.id == item?.product.id ? { ...pdt, quantity: pdt.quantity - 1 } : pdt); 

    }else{ // remove item from cart
      updatedCart = this.cart.value.filter(pdt => pdt?.product.id != item?.product.id );
    }

    this.cart.next(updatedCart);
    this.totalCount.next(updatedCount);
    this.updateHistory(JSON.stringify(this.cart.value));
    
  }
  increaseQuantity(item: CartItem) {
    let updatedCart = this.cart.value.map(pdt=> pdt?.product.id == item?.product.id ? { ...pdt, quantity: pdt.quantity + 1 } : pdt);
    let updatedCount = this.totalCount.value + 1;

    this.cart.next(updatedCart);
    this.totalCount.next(updatedCount);
    this.updateHistory(JSON.stringify(this.cart.value));
  }
  clearCart(){
    let updatedCart : [] = [];
    this.cart.next(updatedCart);
    this.totalCount.next(0);
    this.clearHistory();
  }
}
