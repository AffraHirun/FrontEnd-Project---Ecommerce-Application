import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loggedIn = false;

  constructor(private http: HttpClient) { }
  url:string = "http://localhost:3000/products";
  url1:string="http://localhost:3000/orders";

  getProducts(): Observable<Product[]>{
return this.http.get<Product[]>(this.url);
  }

  getProductById(id?: number): Observable<Product> {
    return this.http.get<Product>(this.url+"/"+id);
  }


  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url1);
  }
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url1, order);
  }
login(){
  this.loggedIn = true;
}
  

  
}
