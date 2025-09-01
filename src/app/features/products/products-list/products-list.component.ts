import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';
import { PaginationComponent } from "./pagination/pagination.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, PaginationComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers: [ProductsService]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: any[] = [];
  categories : any[] = [];
  category: string = "";
  productsSub !: Subscription;
  routeSub !: Subscription;
  searchSub !: Subscription;
  categoriesSub !: Subscription;
  listedProducts: any[] = [];
  listKey: string = 'productsList';
  feature: string = 'default';
  featureName : string = 'Featured';
  productsPerPage = 6;
  currentPage = 1;
  constructor(private productsService: ProductsService, private route: ActivatedRoute, private cartService: CartService, private searchService: SearchService, private toaster: ToastrService) { }
  ngOnInit(): void {
    this.productsSub = this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.listedProducts = data;

        this.routeSub = this.route.params.subscribe((params) => {
          if (params['category']) {
            this.category = params['category'];
            console.log(this.category);
            
            this.filterProductsByCategory(this.category);
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
      // console.log('Search Result reached posts list componenet', result);
      this.filterProductsBySearch(result);
    });
    
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
  }

  filterProductsByCategory(category: string) {
    this.listedProducts = this.products.filter(function (product) {
      return product?.category == category;
    });
    this.setFeature(this.feature, this.featureName);
    this.updateLocalStorage();
  }

  filterProductsBySearch(text: String) {
    if (!text) {
      this.listedProducts = this.category? this.products.filter(p => p.category === this.category)
        : [...this.products];
    } else {
      this.listedProducts = this.listedProducts.filter(product =>
        product?.category.toLowerCase().includes(text.toLowerCase()) || product?.description.toLowerCase().includes(text.toLowerCase()) || product?.title.toLowerCase().includes(text.toLowerCase())
      );
    }
    this.updateLocalStorage();
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.toaster.success(`${product.title} added to cart!`, 'Cart Updated!');
  }
  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if(this.categoriesSub){
      this.categoriesSub.unsubscribe();
    }
  }
  updateLocalStorage() {
    localStorage.setItem(this.listKey, JSON.stringify(this.listedProducts));
    console.log("Local Storage Updated successfully");
  }
  changePage(page: number){
    this.currentPage = page;
  }

  get paginatedData(){
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    return this.listedProducts.slice(start, end);
  }
  resetCategory(){
    this.category = "";
    this.setFeature("default", "Featured");
  }
  setFeature(feature: string, featureName: string){
    this.feature = feature;
    this.featureName = featureName;
    switch(feature){
      case 'default':
        this.listedProducts = this.category? this.products.filter(p => p.category === this.category)
        : [...this.products];
        break;
      case 'alphAsc':
        this.listedProducts.sort((a,b) => a.title.localeCompare(b.title));
        break;

      case 'alphDesc':
        this.listedProducts.sort( (a,b) => b.title.localeCompare(a.title));
        break;
      case 'asc':
        this.listedProducts.sort ((a,b)=> a.price - b.price);
        break;
      case 'desc':
        this.listedProducts.sort ((a,b)=> b.price - a.price);
        break;
    }
  }
}
