import { Component } from '@angular/core';
import { CustomSelectComponent } from '../shared/components/custom-select/custom-select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, CustomSelectComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  selectedValue: string = '';
  unities = [
    { title: 'Unidade 1', description: 'Present Simple - Verb To Do' },
    { title: 'Unidade 2', description: 'Phrasel Verbs + Infinitive Verbs' },
    { title: 'Unidade 4', description: 'Past Simple - Regular Verbs' },
    {
      title: 'Unidade 5',
      description: 'Perfect Tense - Verb to have + main verb',
    },
    {
      title: 'Unidade 6',
      descriptiown: 'Modal Verbs- Could, would, might, ougth + to',
    },
    // Add more units as needed
  ];
  handleSelection(event: string) {
    this.selectedValue = event;
  }
}
