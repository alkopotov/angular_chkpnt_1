import { Component, inject } from '@angular/core';
import { ProductListService } from '../../service/product-list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.css'
})
export class FilterFormComponent {

  public productListService = inject(ProductListService);


}
