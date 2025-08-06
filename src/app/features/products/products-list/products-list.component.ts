import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers:[ProductsService]
})
export class ProductsListComponent implements OnInit{
  products: any[] = [];
  constructor(private productsService: ProductsService){

  }
  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (data)=>{
        console.log('DATA >>>>', data);
        this.products = data;
        
      },
      error: (err)=>{
        console.error(err);
        
      },
      complete: ()=>{
        console.log('Fetching data complete');
        
      }
    })

  }
}
