import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {HeaderOnSmallComponent} from "../../shared/components/header-on-small/header-on-small.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import { MobileSidebarService } from '../../shared/services/mobile-sidebar.service';

@Component({
  selector: 'app-layout-content',
  imports: [
    CommonModule,
    HeaderComponent,
    HeaderOnSmallComponent,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout-content.component.html',
  styleUrl: './layout-content.component.scss'
})
export class LayoutContentComponent {
  protected mobileSidebarService = inject(MobileSidebarService);

  closeMobileSidebar(): void {
    this.mobileSidebarService.close();
  }
}
