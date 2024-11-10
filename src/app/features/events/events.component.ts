import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiPopup } from '@taiga-ui/core';
import { TuiBadge, TuiDrawer, TuiTabs } from '@taiga-ui/kit';
interface event {
  color: string;
  title?: string;
}
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, TuiDrawer, TuiPopup, TuiBadge, TuiTabs],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  events: event[] = [
    { color: 'primary' },
    { color: 'success' },
    { color: 'accent' },
    { color: 'success' },
    { color: 'primary' },
    { color: 'success' },
  ];
  protected readonly open = signal(false);
}
