import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  cards: any[] = [{ label: 'Curso de Ingles' }, { label: 'Curso de Ingles' }];

  dots: any[] = [1, 3, 4, 5, 6, 7];
}
