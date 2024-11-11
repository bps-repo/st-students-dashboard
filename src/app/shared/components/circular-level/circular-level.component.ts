import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-level',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circular-level.component.html',
  styleUrl: './circular-level.component.scss',
})
export class CircularLevelComponent {
  @Input() label: string = '';
  @Input() status: string = '';
  @Input() color: string = 'primary';
  @Input() size: string = 'primary';
}
