import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiCarousel, TuiPagination } from '@taiga-ui/kit';
import { FlashCardComponent } from '../../shared/flash-card/flash-card.component';
import { FlashCard } from '../@types/flash-card';
@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [
    TuiCarousel,
    TuiPagination,
    CommonModule,
    TuiButton,
    FlashCardComponent,
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
})
export class LessonsComponent {
  protected duration = 10_000;
  protected index = 0;
  protected items = Array.from({ length: 10 }, (_, i) => ({
    label: `Lesson ${i + 1}`,
    image: '/courses/course_blue.png',
    color: 'primary',
  }));

  protected lessons: FlashCard[] = [
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'accent', image: '/users/3.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/3.png' },
  ];
}
