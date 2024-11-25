import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiPopup } from '@taiga-ui/core';
import { TuiBadge, TuiDrawer } from '@taiga-ui/kit';
import { FlashCardComponent } from '../../shared/flash-card/flash-card.component';
import { FlashCard } from '../@types/flash-card';
import { TabMenuComponent } from '../../shared/components/tab-menu/tab-menu.component';
import { TabMenuConfig } from '../@types/tab-menu';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    TuiDrawer,
    TuiPopup,
    TuiBadge,
    FlashCardComponent,
    TabMenuComponent,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
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
