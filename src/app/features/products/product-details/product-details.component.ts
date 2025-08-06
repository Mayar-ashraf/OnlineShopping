import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [ProductsService]
})


export class ProductDetailsComponent implements OnInit {

  productId = 0;
  productData : any;
  
  constructor(private route: ActivatedRoute, private productsService: ProductsService) {

  }
  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.getProduct(this.productId);
    });

  }
  getProduct(id: number) {
    this.productsService.getProduct(id).subscribe({
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
    })
  }
}
