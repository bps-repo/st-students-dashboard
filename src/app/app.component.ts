import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HeaderOnSmallComponent } from './shared/components/header-on-small/header-on-small.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    MainContentComponent,
    HeaderComponent,
    HeaderOnSmallComponent,
    RouterLink,
    CommonModule,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'students-dashboard';
  // Use BehaviorSubject to track sidebar state
}
