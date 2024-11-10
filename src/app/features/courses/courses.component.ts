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
  protected readonly contents: Course[] = [
    { label: 'Video curso completo', color: 'primary', type: 'content' },
    { label: 'Conversação', color: 'success', type: 'content' },
    { label: 'Pronuncia', color: 'primary', type: 'content' },
    { label: 'Leitura e Escrita', color: 'primary', type: 'content' },
    { label: 'Reading and Writing', color: 'success', type: 'content' },
    { label: 'listening', color: 'primary', type: 'content' },
  ];

  protected readonly modules: Course[] = [
    { label: 'Beginner', color: 'primary', type: 'course' },
    { label: 'Elementary', color: 'warning', type: 'course' },
    { label: 'Intermediate', color: 'success', type: 'course' },
    { label: 'Upper Intermedidate', color: 'warning', type: 'course' },
    { label: 'Advanced', color: 'primary', type: 'course' },
  ];
}
