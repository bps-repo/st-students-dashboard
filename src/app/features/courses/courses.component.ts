import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardSliderComponent } from '../../shared/components/card-slider/card-slider.component';
import { Course } from '../@types/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CardSliderComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  protected readonly contents: Course[] = [
    {
      label: 'Video curso completo',
      image: '/courses/course_blue.png',
      color: 'primary',
      type: 'content',
    },
    {
      label: 'Conversação',
      image: '/courses/course_green.png',
      color: 'success',
      type: 'content',
    },
    {
      label: 'Pronuncia',
      image: '/courses/course_blue.png',
      color: 'primary',
      type: 'content',
    },
    {
      label: 'Leitura e Escrita',
      image: '/courses/course_blue.png',
      color: 'primary',
      type: 'content',
    },
    {
      label: 'Reading and Writing',
      image: '/courses/course_green.png',
      color: 'success',
      type: 'content',
    },
    {
      label: 'listening',
      image: '/courses/course_blue.png',
      color: 'primary',
      type: 'content',
    },
  ];

  protected readonly modules: Course[] = [
    {
      label: 'Beginner',
      image: '/courses/course_blue.png',
      color: 'primary',
      type: 'course',
    },
    {
      label: 'Elementary',
      image: '/courses/course_white.png',
      color: 'warning',
      type: 'course',
    },
    {
      label: 'Intermediate',
      image: '/courses/course_green.png',
      color: 'success',
      type: 'course',
    },
    {
      label: 'Upper Intermedidate',
      image: '/courses/course_orange.png',
      color: 'warning',
      type: 'course',
    },
    {
      label: 'Advanced',
      image: '/courses/course_blue.png',
      color: 'primary',
      type: 'course',
    },
  ];
}
