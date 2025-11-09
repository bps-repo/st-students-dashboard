import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Course } from "../../../@types/course";
import { RouterLink } from "@angular/router";
import { Level } from "../../../core/models/Level";

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
export class CardSliderComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() index = 0;
  @Input() items: Level[] = [];
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

  ngOnChanges(changes: SimpleChanges) {
    // When items change (e.g., when levels load), recalculate scroll position
    if (changes['items']) {
      // Use setTimeout to ensure DOM has updated after items are rendered
      setTimeout(() => this.checkScrollPosition(), 150);
    }
  }

  ngAfterViewInit() {
    // Initial check for scroll buttons visibility
    // Use a longer timeout to ensure items are loaded and rendered
    setTimeout(() => this.checkScrollPosition(), 200);
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
    if (this.scrollContainer && this.items && this.items.length > 0) {
      const container = this.scrollContainer.nativeElement;

      // Wait for next tick to ensure layout is calculated
      requestAnimationFrame(() => {
        // Can scroll left if we're not at the start
        this.canScrollLeft = container.scrollLeft > 0;

        // Can scroll right if we haven't reached the end (with small threshold for rounding)
        const scrollThreshold = 5;
        this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - scrollThreshold);

        // Force change detection to update button visibility
        this.cdr.detectChanges();
      });
    } else {
      // No items or container not ready, hide both buttons
      this.canScrollLeft = false;
      this.canScrollRight = false;
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
      case 'Beginner':
        return 'from-primary-600 to-primary-500';
      case 'Intermediate':
        return 'from-secondary-600 to-secondary-500';
      case 'Advanced':
        return 'from-accent-600 to-accent-500';
      case 'Pre-Intermediate':
        return 'from-success-700 to-success-500';
      case 'Elementary':
        return 'from-warning-700 to-warning-500';
      default:
        return 'from-primary-600 to-primary-500';
    }
  }

  getLevelColor(color: string | undefined): string {
    if (!color) {
      return 'from-primary-600 to-primary-500'; // Default gradient if color is undefined
    }
    switch (color) {
      case 'Elementary':
        return 'primary';
      case 'Intermediate':
        return 'secondary';
      case 'Advanced':
        return 'accent';
      case 'Pre-Intermediate':
        return 'success';
      case 'Upper-Intermediate':
        return 'warning';
      default:
        return 'primary';
    }
  }
}
