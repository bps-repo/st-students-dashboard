import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiCarousel, TuiPagination } from '@taiga-ui/kit';
import { Course } from '../../../features/@types/course';
@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [CommonModule, TuiButton, TuiPagination, TuiCarousel, TuiPagination],
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSliderComponent {
  protected duration = isPlatformBrowser(inject(PLATFORM_ID)) ? 10_000 : 0;
  @Input() index = 0;
  @Input() items: Course[] = [];
  protected textColor: string = '';
  protected bgColor: string = '';
}
