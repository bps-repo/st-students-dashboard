import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private sidebarState = new BehaviorSubject<boolean>(true);
  showSidebar$ = this.sidebarState.asObservable();

  toggleSidebar() {
    const currentState = this.sidebarState.getValue(); // Get current value
    this.sidebarState.next(!currentState); // Toggle value
  }
}
