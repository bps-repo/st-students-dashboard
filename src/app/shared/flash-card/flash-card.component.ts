import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FlashCard } from '../../features/@types/flash-card';

@Component({
    selector: 'app-flash-card',
    imports: [CommonModule],
    templateUrl: './flash-card.component.html',
    styleUrl: './flash-card.component.scss'
})
export class FlashCardComponent {
  @Input() dataInput!: FlashCard;
  protected readonly open = signal(false);
}
