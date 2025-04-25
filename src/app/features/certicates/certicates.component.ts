import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Certificate } from '../@types/certificate';
import { CircularLevelComponent } from '../../shared/components/circular-level/circular-level.component';

/**
 * Modern Certificates Component
 *
 * Displays the user's earned certificates and current level progress
 * with a modern, responsive design.
 */
@Component({
    selector: 'app-certicates',
    imports: [CommonModule, CircularLevelComponent],
    templateUrl: './certicates.component.html',
    styleUrl: './certicates.component.scss'
})
export class CerticatesComponent {
  // Current user level information
  currentLevel: string = 'Advanced';
  levelProgress: number = 75;

  // Certificate data
  certificates: Certificate[] = [
    {
      title: 'Beginner',
      description: 'Ideal para quem quer ter o primeiro contato com o idioma. Foco em vocabulário básico e expressões simples.',
      color: 'primary',
    },
    {
      title: 'Elementary',
      description: 'Desenvolve habilidades básicas de comunicação para situações cotidianas simples.',
      color: 'accent',
    },
    {
      title: 'Pre-Intermediate',
      description: 'Expande o vocabulário e introduz estruturas gramaticais mais complexas para comunicação efetiva.',
      color: 'success',
    },
    {
      title: 'Intermediate',
      description: 'Aprofunda o conhecimento gramatical e vocabulário para discussões sobre diversos temas.',
      color: 'primary',
    },
    {
      title: 'Upper-Intermediate',
      description: 'Desenvolve fluência e precisão para comunicação em contextos pessoais e profissionais.',
      color: 'secondary',
    },
    {
      title: 'Advanced',
      description: 'Alcança fluência próxima a de um nativo, com domínio de expressões idiomáticas e nuances culturais.',
      color: 'accent',
    },
  ];

  /**
   * Downloads the certificate for the specified level
   * @param title The title of the certificate to download
   */
  downloadCertificate(title: string): void {
    console.log(`Downloading certificate for ${title}...`);
    // Implementation would connect to a service to generate and download the certificate
  }
}
