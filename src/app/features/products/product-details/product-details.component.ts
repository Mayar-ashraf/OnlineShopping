import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [ProductsService]
})


export class ProductDetailsComponent implements OnInit, OnDestroy {

  productId = 0;
  productData : any;
  routeSub !: Subscription;
  productSub !: Subscription;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {

  }
  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.getProduct(this.productId);
    });

  }
  getProduct(id: number) {
    this.productSub = this.productsService.getProduct(id).subscribe({
      next: (data) => {
        console.log(data);
        console.log(typeof data.rating);
        this.productData = data;
        console.log('the data: ',this.productData);
        
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log("Product's Data fetched successfully.");

      }
    });
  }
  ngOnDestroy(): void {
    if(this.routeSub){
      this.routeSub.unsubscribe();
      console.log('ngOnDestory Called from product details componenet for routeSub');
    }
    if(this.productSub){
      this.productSub.unsubscribe();
      console.log('ngOnDestroy Called from product details componenet for productSub');
      
    }
  }
}
