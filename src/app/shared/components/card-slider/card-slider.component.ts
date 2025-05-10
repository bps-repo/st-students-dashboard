import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Course} from "../../../@types/course";
import {RouterLink} from "@angular/router";

/**
 * Modern Card Slider Component
 *
 * Displays a horizontal scrollable carousel of course or content cards with a modern design.
 */
@Component({
  selector: 'app-card-slider',
  imports: [CommonModule, NgbCarouselModule, MatPaginatorModule, RouterLink],
  templateUrl: './card-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSliderComponent implements OnInit, AfterViewInit {
  @Input() index = 0;
  @Input() items: Course[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  canScrollLeft = false;
  canScrollRight = true;

  private scrollAmount = 300; // Amount to scroll on button click

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Initial check for scroll buttons visibility
    setTimeout(() => this.checkScrollPosition(), 100);
  }

  /**
   * Scroll the container to the left
   */
  scrollLeft() {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollLeft -= this.scrollAmount;
    }
  }

  /**
   * Scroll the container to the right
   */
  scrollRight() {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollLeft += this.scrollAmount;
    }
  }

  /**
   * Handle scroll events to update navigation button visibility
   */
  onScroll() {
    this.checkScrollPosition();
  }

  /**
   * Check if we can scroll in either direction and update button visibility
   */
  private checkScrollPosition() {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;

      // Can scroll left if we're not at the start
      this.canScrollLeft = container.scrollLeft > 0;

      // Can scroll right if we haven't reached the end
      this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 5);

      // Force change detection to update button visibility
      this.cdr.detectChanges();
    }
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
