import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    MainContentComponent,
    HeaderComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'students-dashboard';
  // Use BehaviorSubject to track sidebar state
  private sidebarState = new BehaviorSubject<boolean>(true);
  showSidebar$ = this.sidebarState.asObservable();

  toggleSidebar() {
    const currentState = this.sidebarState.getValue(); // Get current value
    this.sidebarState.next(!currentState); // Toggle value
  }
}
