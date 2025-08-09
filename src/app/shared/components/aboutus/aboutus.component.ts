import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../features/products/services/products.service';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss',
  providers: [ProductsService]
})
export class AboutusComponent implements OnInit{
  categories: string[] = [];
  constructor(private productService: ProductsService){
    
  }
  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (data)=>{
        console.log(data);
        this.categories = data;
      },
      error: (err)=>{
        console.error(err);
        
      },
      complete: ()=>{
        console.log('data fetched');
        
      }
    })
  }

}
