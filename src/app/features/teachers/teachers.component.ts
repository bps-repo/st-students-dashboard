import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Teacher {
  name: string;
  image: string;
}
@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent {
  protected teachers: Array<Teacher> = [
    {
      name: `Teacher 1`,
      image: '/users/1.png',
    },
    {
      name: `Teacher 2`,
      image: '/users/2.png',
    },
    {
      name: `Teacher 3`,
      image: '/users/1.png',
    },
    {
      name: `Teacher 3`,
      image: '/users/1.png',
    },
  ];
}
