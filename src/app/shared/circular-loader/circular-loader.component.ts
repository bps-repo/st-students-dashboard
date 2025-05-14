import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';


// Loader Examples

/*
<div class="p-8 flex flex-col gap-8 items-center">
  <h1 class="text-2xl font-bold mb-4">Circular Loader Examples</h1>

  <div class="flex gap-4 items-center">
    <app-circular-loader size="sm" color="primary"></app-circular-loader>
    <span class="text-sm">Small Primary Loader</span>
  </div>

  <div class="flex gap-4 items-center">
    <app-circular-loader size="md" color="success"></app-circular-loader>
    <span class="text-sm">Medium Success Loader</span>
  </div>

  <div class="flex gap-4 items-center">
    <app-circular-loader size="lg" color="danger"></app-circular-loader>
    <span class="text-sm">Large Danger Loader</span>
  </div>

  <div class="flex gap-4 items-center">
    <app-circular-loader size="xl" color="warning"></app-circular-loader>
    <span class="text-sm">Extra Large Warning Loader</span>
  </div>
</div>
*/


@Component({
  selector: 'app-circular-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circular-loader.component.html',
})
export class CircularLoaderComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';

  get sizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'w-6 h-6';
      case 'md':
        return 'w-10 h-10';
      case 'lg':
        return 'w-16 h-16';
      case 'xl':
        return 'w-24 h-24';
      default:
        return 'w-10 h-10';
    }
  }

  get colorClass(): string {
    switch (this.color) {
      case 'primary':
        return 'border-blue-500';
      case 'secondary':
        return 'border-gray-500';
      case 'success':
        return 'border-green-500';
      case 'danger':
        return 'border-red-500';
      case 'warning':
        return 'border-yellow-500';
      case 'info':
        return 'border-cyan-500';
      default:
        return 'border-blue-500';
    }
  }
}

