import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
})
export class CardSliderComponent {
  cards = [
    {
      image:
        'https://media.englishbay.com.br/f3727f34-c54b-46fa-a5d3-122eb03d4afc.jpg',
      title: 'Video Curso Completo',
      description:
        'Curso Aprenda Falando com 72 video aulas + material e exercícios para você aprender',
      progress: 0,
    },
    {
      image:
        'https://media.englishbay.com.br/f3727f34-c54b-46fa-a5d3-122eb03d4afc.jpg',
      title: 'Conversação',
      description: 'Materiais do Curso de Conversação para aulas particulares',
      progress: 0,
    },
    {
      image:
        'https://media.englishbay.com.br/f3727f34-c54b-46fa-a5d3-122eb03d4afc.jpg',
      title: 'Business',
      description:
        'Aprimore o seu inglês para receber aquela promoção ou conseguir um emprego no exterior.',
      progress: 0,
    },
  ];
}
