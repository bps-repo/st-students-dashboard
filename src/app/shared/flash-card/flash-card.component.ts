import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FalshCard } from '../../features/@types/flash-card';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.scss',
})
export class FlashCardComponent {
  @Input() dataInput!: FalshCard;
  protected readonly open = signal(false);
}
