import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-custom-select',
    imports: [CommonModule],
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  public selectedOption: string = 'C2 - Advanced';
  public options: string[] = [
    'C2 - Avançado',
    'B1 - Intermediário',
    'A2 - Iniciante',
  ];
  public isOpen: boolean = false;

  @Output() selectionChange = new EventEmitter<string>();

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.selectionChange.emit(option); // Emit selected value
  }
}
