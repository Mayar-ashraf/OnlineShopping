import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../features/products/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartComponent } from "../../../features/cart/cart/cart.component";
import { SearchService } from '../../../features/products/services/search.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../features/products/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss', 
  providers: [ProductsService]
})
export class NavbarComponent implements OnInit, OnDestroy {
  categories : any[] = [];
  cartSub !: Subscription;
  searchText: string = '';
  cartItemsCount : number = 0;
  constructor( private seachService:SearchService, private cartService: CartService){ }

  ngOnInit(): void {
    this.cartSub =this.cartService.getProductsCount().subscribe(result=>{
      this.cartItemsCount = result;
    });
  }
  ngOnDestroy(): void {
    if(this.cartSub){
      this.cartSub.unsubscribe();
    }  
  }
  search(){
    this.seachService.setSearchText(this.searchText);
  }
}
