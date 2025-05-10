// video-courses.component.ts
import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

interface Course {
  id: number;
  title: string;
  level: string;
  type: string;
  duration?: string;
  views?: number;
  pages?: number;
  downloads?: number;
  challenges?: number;
  completions?: number;
  thumbnail: string;
  instructor: string;
}

interface Tab {
  id: string;
  label: string;
}

interface Level {
  id: string;
  label: string;
}

@Component({
  selector: 'app-video-courses',
  templateUrl: './video-courses.component.html',
  imports: [FormsModule, NgClass, NgForOf, NgIf]
})
export class VideoCoursesComponent implements OnInit {
  activeTab = 'all';
  activeLevel = 'all';
  searchQuery = '';

  tabs: Tab[] = [
    { id: 'all', label: 'Todos' },
    { id: 'videos', label: 'Vídeos' },
    { id: 'documents', label: 'Documentos' },
    { id: 'exercises', label: 'Exercícios' }
  ];

  levels: Level[] = [
    { id: 'all', label: 'Todos os Níveis' },
    { id: 'beginner', label: 'Iniciante' },
    { id: 'elementary', label: 'Elementar' },
    { id: 'intermediate', label: 'Intermediário' },
    { id: 'advanced', label: 'Avançado' }
  ];

  courses: Course[] = [
    {
      id: 1,
      title: 'Fundamentos de Programação Web',
      level: 'beginner',
      type: 'video',
      duration: '45 min',
      views: 324,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. Roberto Santos'
    },
    {
      id: 2,
      title: 'HTML e CSS para Iniciantes',
      level: 'beginner',
      type: 'video',
      duration: '37 min',
      views: 218,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. Ana Silva'
    },
    {
      id: 3,
      title: 'JavaScript - Estruturas de Controle',
      level: 'elementary',
      type: 'video',
      duration: '52 min',
      views: 189,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. João Oliveira'
    },
    {
      id: 4,
      title: 'Frameworks Frontend - Angular',
      level: 'intermediate',
      type: 'video',
      duration: '63 min',
      views: 246,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. Carla Mendes'
    },
    {
      id: 5,
      title: 'APIs RESTful com Node.js',
      level: 'advanced',
      type: 'video',
      duration: '58 min',
      views: 157,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. Lucas Costa'
    },
    {
      id: 6,
      title: 'Guia de Referência HTML',
      level: 'beginner',
      type: 'documents',
      pages: 24,
      downloads: 187,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. Maria Souza'
    },
    {
      id: 7,
      title: 'Exercícios de JavaScript',
      level: 'elementary',
      type: 'exercises',
      challenges: 15,
      completions: 94,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. Paulo Ferreira'
    },
    {
      id: 8,
      title: 'Padrões de Projeto em TypeScript',
      level: 'advanced',
      type: 'video',
      duration: '72 min',
      views: 128,
      thumbnail: '/courses/course_blue.png',
      instructor: 'Prof. Roberto Santos'
    }
  ];

  filteredCourses: Course[] = [];
  totalVideos = 0;
  totalLevels = 0;
  levelCounts: { [key: string]: number } = {};

  ngOnInit(): void {
    this.calculateStatistics();
    this.filterCourses();
  }

  calculateStatistics(): void {
    this.totalVideos = this.courses.filter(c => c.type === 'video').length;

    // Get unique levels count
    const uniqueLevels = new Set(this.courses.map(c => c.level));
    this.totalLevels = uniqueLevels.size;

    // Calculate count per level
    this.levels.forEach(level => {
      if (level.id !== 'all') {
        this.levelCounts[level.id] = this.courses.filter(c => c.level === level.id).length;
      }
    });
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesTab = this.activeTab === 'all' || course.type === this.activeTab;
      const matchesLevel = this.activeLevel === 'all' || course.level === this.activeLevel;
      const matchesSearch = this.searchQuery === '' ||
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesTab && matchesLevel && matchesSearch;
    });
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
    this.filterCourses();
  }

  setActiveLevel(levelId: string): void {
    this.activeLevel = levelId;
    this.filterCourses();
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterCourses();
  }

  getLevelLabel(levelId: string): string {
    switch(levelId) {
      case 'beginner': return 'Iniciante';
      case 'elementary': return 'Elementar';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return '';
    }
  }

  getLevelColor(levelId: string): string {
    switch(levelId) {
      case 'beginner': return 'green';
      case 'elementary': return 'blue';
      case 'intermediate': return 'amber';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  }
}
