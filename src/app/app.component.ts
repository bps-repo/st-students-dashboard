import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { HeaderOnSmallComponent } from './shared/components/header-on-small/header-on-small.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        SidebarComponent,
        HeaderComponent,
        HeaderOnSmallComponent,
        RouterLink,
        CommonModule,
        RouterLinkActive,
        TuiRoot
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'students-dashboard';
  // Use BehaviorSubject to track sidebar state
}
