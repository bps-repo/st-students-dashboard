import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardSliderComponent } from '../../shared/components/card-slider/card-slider.component';
import { Course } from '../types/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CardSliderComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  protected readonly cards: Course[] = [
    { label: 'Video curso completo' },
    { label: 'Conversação', color: 'bg-card_yellow' },
    { label: 'Pronuncia' },
    { label: 'Leitura e Escrita', color: 'bg-card_yellow' },
    { label: 'Reading and Writing' },
    { label: 'listening' },
  ];

  protected readonly modules: Course[] = [
    { label: 'Beginner', color: 'bg-card_white', type: 'c' },
    { label: 'Elementary', color: 'bg-card_white', type: 'c' },
    { label: 'Intermediate', color: 'bg-card_white', type: 'c' },
    { label: 'Upper Intermedidate', color: 'bg-card_white', type: 'c' },
    { label: 'Advanced', color: 'bg-card_white', type: 'c' },
  ];
}
