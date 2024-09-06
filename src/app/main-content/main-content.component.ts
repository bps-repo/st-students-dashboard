import { Component } from '@angular/core';
import { CardSliderComponent } from '../card-slider/card-slider.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CardSliderComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {}
