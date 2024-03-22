import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating-elem',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './rating-elem.component.html',
  styleUrl: './rating-elem.component.css'
})
export class RatingElemComponent {
  @Input() rating: number
  faStar = faStar
  
  public getIntRating(): number {
    return Math.round(this.rating)
  }
}
