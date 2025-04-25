import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {HeaderOnSmallComponent} from "../../shared/components/header-on-small/header-on-small.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-layout-content',
  imports: [
    HeaderComponent,
    HeaderOnSmallComponent,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout-content.component.html',
  styleUrl: './layout-content.component.scss'
})
export class LayoutContentComponent {
}
