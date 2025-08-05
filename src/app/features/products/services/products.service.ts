import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsUrl = 'https://fakestoreapi.com/products';
  categoriesUrl = 'https://fakestoreapi.com/products/categories';
  constructor(private http: HttpClient) {
    
   }
  getProducts() : Observable<any>{
    return this.http.get(this.productsUrl);
  }
  getCategories(): Observable<any>{
    return this.http.get(this.categoriesUrl);
  }
}
