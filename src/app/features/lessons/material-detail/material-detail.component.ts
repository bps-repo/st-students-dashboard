import { Component } from '@angular/core';
import { YoutubePlayerComponent } from '../../../shared/components/youtube-player/youtube-player.component';
import { CommonModule } from '@angular/common';

/**
 * Modern Material Detail Component
 *
 * Displays detailed information about a specific learning material
 * with a modern, responsive design.
 */
@Component({
    selector: 'app-material-detail',
    imports: [YoutubePlayerComponent, CommonModule],
    templateUrl: './material-detail.component.html',
    styleUrl: './material-detail.component.scss'
})
export class MaterialDetailComponent {
  // Array of numbers for the ordinal numbers example
  protected listNumbers = new Array<number>(
    ...Array.from({ length: 50 }, (_, i) => i + 1),
  );

  /**
   * Returns the ordinal suffix for a number (1st, 2nd, 3rd, etc.)
   * @param num The number to get the ordinal suffix for
   * @returns The number with its ordinal suffix
   */
  protected getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;

    if (j === 1 && k !== 11) {
      return num + "st";
    }
    if (j === 2 && k !== 12) {
      return num + "nd";
    }
    if (j === 3 && k !== 13) {
      return num + "rd";
    }
    return num + "th";
  }
}
