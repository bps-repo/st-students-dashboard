import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiPopup } from '@taiga-ui/core';
import { TuiBadge, TuiDrawer, TuiTabs } from '@taiga-ui/kit';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, TuiDrawer, TuiPopup, TuiBadge, TuiTabs],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  events: any[] = [1, 2, 3, 4, 5];
  protected readonly open = signal(false);
}
