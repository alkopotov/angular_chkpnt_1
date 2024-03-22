import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  public products: any[] = [];

  public fetchProducts(): void {
    fetch('https://dummyjson.com/products?limit=50')
      .then(res => res.json())
        .then(data => this.products = data.products)
  }
}
