import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {HeaderOnSmallComponent} from "../../shared/components/header-on-small/header-on-small.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {TuiRoot} from "@taiga-ui/core";

@Component({
  selector: 'app-layout-content',
  imports: [
    HeaderComponent,
    HeaderOnSmallComponent,
    RouterOutlet,
    SidebarComponent,
    TuiRoot
  ],
  templateUrl: './layout-content.component.html',
})
export class LayoutContentComponent {
}
