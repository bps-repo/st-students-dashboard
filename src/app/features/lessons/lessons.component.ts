import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiCarousel } from '@taiga-ui/kit';
import { FlashCard } from '../@types/flash-card';
import { TabMenuComponent } from '../../shared/components/tab-menu/tab-menu.component';
import { TabMenuConfig } from '../@types/tab-menu';
import { FlashCardComponent } from '../../shared/components/flash-card/flash-card.component';
@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [TuiCarousel, CommonModule, FlashCardComponent, TabMenuComponent],
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

  protected tabConfig: TabMenuConfig = {
    mainTab: 'Todas as aulas',
    tabs: ['Favoritos', 'Histórico das aulas'],
    actionButtons: [],
  };

  protected lessons: FlashCard[] = [
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'accent', image: '/users/3.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/3.png' },
  ];
}
