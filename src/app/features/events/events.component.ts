import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiPopup } from '@taiga-ui/core';
import { TuiBadge, TuiDrawer } from '@taiga-ui/kit';
import { FlashCard } from '../@types/flash-card';
import { FlashCardComponent } from '../../shared/flash-card/flash-card.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, TuiDrawer, TuiPopup, TuiBadge, FlashCardComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  events: FlashCard[] = [
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'accent', image: '/users/3.png' },
    { color: 'success', image: '/users/2.png' },
    { color: 'primary', image: '/users/1.png' },
    { color: 'success', image: '/users/3.png' },
  ];
}
