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
  imports: [RouterModule, HttpClientModule, CommonModule, CartComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss', 
  providers: [ProductsService]
})
export class NavbarComponent implements OnInit, OnDestroy {
  categories : any[] = [];
  selectedCategory: string = "All Categories";
  categoriesSub !: Subscription;
  cartSub !: Subscription;
  searchText: string = '';
  cartItemsCount : number = 0;
  constructor(private productsService: ProductsService, private seachService:SearchService, private cartService: CartService){ }

  ngOnInit(): void {
    this.categoriesSub = this.productsService.getCategories().subscribe({
      next: (data)=>{
        this.categories = data;
      },
      error: (err)=>{
        console.error(err);
      },
      complete: ()=>{
        console.log("Categories Retrieved from API Successfully");
      }
    });

    this.cartSub =this.cartService.getProductsCount().subscribe(result=>{
      
      this.cartItemsCount = result;
      
    });
  }
  selectCategory(category: string){
    this.selectedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  }
  ngOnDestroy(): void {
    if(this.categoriesSub){
      this.categoriesSub.unsubscribe();
    }  
  }
  search(){
    this.seachService.setSearchText(this.searchText);
  }
}
