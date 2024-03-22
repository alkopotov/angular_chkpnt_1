import { Component, Input } from '@angular/core';
import { RatingElemComponent } from '../rating-elem/rating-elem.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RatingElemComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input() image: string;
  @Input() title: string;
  @Input() category: string;
  @Input() price: number;
  @Input() rating: number;
}
