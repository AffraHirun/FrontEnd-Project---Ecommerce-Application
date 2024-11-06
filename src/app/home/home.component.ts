import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []; 
  data: Product[] = [];
  searchText: string = '';
  selectedCategory: string = '';

  constructor(private http1: ProductsService) {}

  ngOnInit(): void {
    console.log("hi");
    this.http1.getProducts().subscribe((data: any) => {
      this.products = data;
      this.data = data;
      console.log(this.products);
    },
    error => {
      console.error('Failed to fetch products due to server error:', error);
      alert('Failed to Fetch Products Due to Server Error !!');
    });
  }

  search() {
    if (this.searchText === '' || !this.searchText) {
      this.data = this.products;
    } else {
      this.data = this.products.filter(pro => 
        pro.name?.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
    }
  }
  filterByCategory() {
    if (this.selectedCategory === '' || !this.selectedCategory) {
      this.data = this.products;
    } else {
      this.data = this.products.filter(pro => pro.category === this.selectedCategory);
    }

  
}
}