import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers: [ProductsService]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: any[] = [];
  category: string = "";
  productsSub !: Subscription;
  routeSub !: Subscription;
  searchSub !: Subscription;
  listedProducts: any[] = [];
  listKey: string = 'productsList';

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private cartService: CartService, private searchService: SearchService) {

  }
  ngOnInit(): void {
    this.productsSub = this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;

        this.routeSub = this.route.params.subscribe((params) => {
          if (params['category']) {
            this.category = params['category'];
            this.filterProductsByCategory(this.category);
          } else {
            this.listedProducts = this.products;
          }
        });
      
      },
      error: (err) => {
        console.error(err);

      },
      complete: () => {
        console.log('Fetching data complete');

      }
    });

    this.searchSub = this.searchService.getSearchText().subscribe(result => {
      console.log('Search Result reached posts list componenet', result);
      this.filterProductsBySearch(result);
    });
  }
  filterProductsByCategory(category: string) {
    this.listedProducts = this.products.filter(function (product) {
      return product?.category == category;
    });
    console.log('Filtered products: ----> ', this.listedProducts);
    this.updateLocalStorage();
  }

  filterProductsBySearch(text: String) {
    if (!text) {
      this.listedProducts = this.products
    } else {
      this.listedProducts = this.products.filter(product =>
        product?.category.toLowerCase().includes(text.toLowerCase()) || product?.description.toLowerCase().includes(text.toLowerCase()) || product?.title.toLowerCase().includes(text.toLowerCase())
      );
      console.log("Searching by ", text);
    }
    this.updateLocalStorage();
  }

  addToCart(product: object): void {
    this.cartService.addToCart(product);
  }
  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
      // console.log('ngOnDestroy called for productsSub'); 
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
      // console.log('ngOnDestroy called for routeSub'); 
    }
  }
  updateLocalStorage() {
    localStorage.setItem(this.listKey, JSON.stringify(this.listedProducts));
    console.log("Local Storage Updated successfully");
  }
}
