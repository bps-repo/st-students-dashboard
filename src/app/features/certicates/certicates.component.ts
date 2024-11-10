import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Certificate } from '../types/certificate';

@Component({
  selector: 'app-certicates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certicates.component.html',
  styleUrl: './certicates.component.scss',
})
export class CerticatesComponent {
  certificates: Certificate[] = [
    {
      title: 'Beginner',
      description: 'deal para quem quer ter o primeiro contato com o idioma',
      color: 'primary',
    },
    {
      title: 'Elementary',
      description: 'deal para quem quer ter o primeiro contato com o idioma',
      color: 'accent',
    },
    {
      title: 'Pre-Intermediate',
      description: 'deal para quem quer ter o primeiro contato com o idioma',
      color: 'success',
    },
    {
      title: 'Intermediate',
      description: 'deal para quem quer ter o primeiro contato com o idioma',
      color: 'primary',
    },
    {
      title: 'Upper-Intermediate',
      description: 'deal para quem quer ter o primeiro contato com o idioma',
      color: 'primary',
    },
    {
      title: 'Advanced',
      description: 'deal para quem quer ter o primeiro contato com o idioma',
      color: 'primary',
    },
  ];
}
