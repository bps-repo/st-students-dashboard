import { Component, Input } from '@angular/core';
import { TabMenuConfig } from '../../../features/@types/tab-menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss',
})
export class TabMenuComponent {
  @Input() tabConfig!: TabMenuConfig;
}
