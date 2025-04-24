import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Teacher {
  name: string;
  image: string;
  role?: string;
  description?: string;
  languages?: string[];
  rating?: number;
  availability?: string;
  specialties?: string[];
}
@Component({
    selector: 'app-teachers',
    imports: [CommonModule],
    templateUrl: './teachers.component.html',
    styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  protected teachers: Array<Teacher> = [
    {
      name: 'Peter Johnson',
      image: '/users/1.png',
      role: 'Senior English Teacher',
      description: 'Hello! I am Peter. I know that learning a new language is not easy. It could be full of struggles. You\'ll need a lot of practice too...',
      languages: ['English', 'Portuguese', 'Spanish'],
      rating: 4.8,
      availability: 'Mon-Fri, 9AM-5PM',
      specialties: ['Business English', 'Conversation', 'TOEFL Prep']
    },
    {
      name: 'Sarah Williams',
      image: '/users/2.png',
      role: 'English Conversation Expert',
      description: 'Hi there! I\'m Sarah and I specialize in conversation practice. I make learning fun and engaging with real-world topics and scenarios.',
      languages: ['English', 'French', 'Portuguese'],
      rating: 4.9,
      availability: 'Weekends & Evenings',
      specialties: ['Conversation', 'Pronunciation', 'Idioms']
    },
    {
      name: 'Michael Brown',
      image: '/users/1.png',
      role: 'IELTS & TOEFL Specialist',
      description: 'I help students prepare for international English exams with proven strategies and personalized feedback to achieve their target scores.',
      languages: ['English', 'German', 'Portuguese'],
      rating: 4.7,
      availability: 'Flexible Hours',
      specialties: ['IELTS', 'TOEFL', 'Academic English']
    },
    {
      name: 'Emma Garcia',
      image: '/users/1.png',
      role: 'Business English Coach',
      description: 'Specialized in business English for professionals. I focus on practical communication skills for workplace success and career advancement.',
      languages: ['English', 'Spanish', 'Portuguese'],
      rating: 4.6,
      availability: 'Weekdays, 8AM-8PM',
      specialties: ['Business English', 'Presentations', 'Negotiations']
    },
  ];
}
