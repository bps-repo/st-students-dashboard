import { Component } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CustomSelectComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  selectedValue: string = '';

  handleSelection(event: string) {
    this.selectedValue = event;
  }
}
