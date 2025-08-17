import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalProducts: any;
  @Input() currentPage: any;
  @Input() productsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  totalPages: number = 0;
  pages : number[] = [];

  constructor() { }
  ngOnInit(): void {
    console.log(this.totalProducts, this.productsPerPage); 
  }
  ngOnChanges(changes: SimpleChanges): void {  // Checks if change occurs in parent's input
    if (changes['totalProducts']) {
      console.log("Updated total products:", this.totalProducts);
      if (this.totalProducts) {
        this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
        this.pages = Array.from({length: this.totalPages}, (_,i) => i+1);
      }
    }
  }
  pageClicked(page: number){
    if(page <= this.totalPages){
      this.onClick.emit(page);
    }
  }
}
