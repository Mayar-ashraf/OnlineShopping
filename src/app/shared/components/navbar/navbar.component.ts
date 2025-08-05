import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../features/products/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss', 
  providers: [ProductsService]
})
export class NavbarComponent implements OnInit {
  categories : any[] = []
  constructor(private productsService: ProductsService){ }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe({
      next: (data)=>{
        console.log('Categoriess>>> ', data);
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
}
