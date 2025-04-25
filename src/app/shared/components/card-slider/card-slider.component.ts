import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input, OnInit,
} from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Course } from '../../../features/@types/course';
import {AnimationFrameService} from "../../../core/animation-frame.service";

/**
 * Modern Card Slider Component
 *
 * Displays a carousel of course or content cards with a modern design.
 */
@Component({
    selector: 'app-card-slider',
    imports: [CommonModule, NgbCarouselModule, MatPaginatorModule],
    templateUrl: './card-slider.component.html',
    styleUrls: ['./card-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSliderComponent implements OnInit {
  @Input() index = 0;
  @Input() items: Course[] = [];

  constructor(private animationService: AnimationFrameService) {
  }

  ngOnInit() {
    this.animationService.request(() => {})
  }

  /**
   * Returns the appropriate gradient class based on the color.
   *
   * @param color The color name (primary, secondary, accent, success, warning) or undefined
   * @returns The gradient class for the specified color
   */
  getGradientClass(color: string | undefined): string {
    if (!color) {
      return 'from-primary-600 to-primary-500'; // Default gradient if color is undefined
    }

    switch (color) {
      case 'primary':
        return 'from-primary-600 to-primary-500';
      case 'secondary':
        return 'from-secondary-600 to-secondary-500';
      case 'accent':
        return 'from-accent-600 to-accent-500';
      case 'success':
        return 'from-success-700 to-success-500';
      case 'warning':
        return 'from-warning-700 to-warning-500';
      default:
        return 'from-primary-600 to-primary-500';
    }
  }
}
