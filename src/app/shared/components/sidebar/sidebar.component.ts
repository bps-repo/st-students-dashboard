import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private sidebarState = new BehaviorSubject<boolean>(true);
  showSidebar$ = this.sidebarState.asObservable();

  navLinks = [
    {
      label: 'Início',
      path: '/',
      icon: 'pi pi-th-large',
    },
    {
      label: 'Cursos',
      path: '/courses',
      icon: 'pi pi-tablet',
    },
    {
      label: 'Minhas Aulas',
      path: '/lessons',
      icon: 'pi pi-folder-open',
    },
    {
      label: 'Professores',
      path: '/teachers',
      icon: 'pi pi-users',
    },
    {
      label: 'Eventos',
      path: '/events',
      icon: 'pi pi-calendar',
    },
    {
      label: 'Certificados',
      path: '/certificates',
      icon: 'pi pi-graduation-cap',
    },
  ];
  toggleSidebar() {
    const currentState = this.sidebarState.getValue(); // Get current value
    this.sidebarState.next(!currentState); // Toggle value
  }
}
