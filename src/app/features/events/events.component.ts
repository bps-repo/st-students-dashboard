import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlashCard } from '../@types/flash-card';
import { TabMenuComponent } from '../../shared/components/tab-menu/tab-menu.component';
import { TabMenuConfig } from '../@types/tab-menu';
import { FlashCardComponent } from '../../shared/components/flash-card/flash-card.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FlashCardComponent, TabMenuComponent],
  templateUrl: './events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  protected events: FlashCard[] = [
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'accent', image: '/users/3.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/3.png' },
  ];

  protected tabConfig: TabMenuConfig = {
    mainTab: 'Todas os eventos',
    tabs: ['Histórico de eventos'],
    actionButtons: [],
  };
}
