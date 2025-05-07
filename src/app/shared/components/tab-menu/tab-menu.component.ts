import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabMenuConfig} from "../../../@types/tab-menu";

@Component({
    selector: 'app-tab-menu',
    imports: [CommonModule],
    templateUrl: './tab-menu.component.html',
    styleUrl: './tab-menu.component.scss'
})
export class TabMenuComponent {
  @Input() tabConfig!: TabMenuConfig;
}
