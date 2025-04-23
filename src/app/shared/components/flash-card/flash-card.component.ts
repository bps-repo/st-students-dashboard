import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlashCard } from '../../../features/@types/flash-card';

@Component({
    selector: 'app-flash-card',
    imports: [CommonModule, RouterModule],
    templateUrl: './flash-card.component.html',
    styleUrl: './flash-card.component.scss'
})
export class FlashCardComponent {
  @Input() dataInput!: FlashCard;
  protected readonly open = signal(false);
}
