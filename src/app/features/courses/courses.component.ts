import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardSliderComponent } from '../../shared/components/card-slider/card-slider.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CardSliderComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  protected readonly cards: any[] = [
    { label: 'Video curso completo' },
    { label: 'Conversação' },
    { label: 'Pronuncia' },
    { label: 'Leitura e Escrita' },
  ];

  protected readonly modules: any[] = [
    { label: 'Beginner' },
    { label: 'Elementary' },
    { label: 'Intermediate' },
    { label: 'Upper Intermedidate' },
    { label: 'Advanced' },
  ];
}
