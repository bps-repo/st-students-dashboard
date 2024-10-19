import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  visibleCourseCardsIndex: number[] = [0, 1];

  dotsButtonLenght: Observable<number> = of(0);

  cards: any[] = [
    { label: 'Curso de Ingles' },
    { label: 'Curso de Matematica' },
    { label: 'Curso de Fisica' },
    { label: 'Curso de Quimica' },
    { label: 'Curso de Quimica' },
  ]

  constructor() {
    this.calculateDotsButtonLength();
    this.dotsButtonLenght.subscribe((v) => console.log(v));
  }

  calculateDotsButtonLength(): void {
    this.dotsButtonLenght = of(Math.ceil(this.cards.length / 2));
  }

  toggleVisibleCourseCards(buttonIndex: any): void {
    console.log(buttonIndex)
  }
}
