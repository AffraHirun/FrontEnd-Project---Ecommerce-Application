import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-alldetails',
  templateUrl: './alldetails.component.html',
  styleUrls: ['./alldetails.component.css']
})
export class AlldetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'pname', 'pprice', 'quantity', 'total', 'name', 'email', 'contact', 'address'];
  orders: Order[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getOrders().subscribe(data => {
      this.orders = data.map(order => ({
        ...order,
        total: order.pprice * order.quantity
      }));
    });
  }
}
