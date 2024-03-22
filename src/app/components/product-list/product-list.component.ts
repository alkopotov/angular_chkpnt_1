import { Component, inject, OnInit } from '@angular/core';
import { ProductListService } from '../../service/product-list.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { log } from 'console';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  public productListService = inject(ProductListService);

  ngOnInit(): void {
    this.productListService.fetchProducts();
  }
}
