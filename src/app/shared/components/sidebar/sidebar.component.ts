import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface navLink {
  label: string;
  path: string;
  icon: string;
  activeIcon?: string;
  active: boolean;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  isNavBarOpened = signal(false);

  navLinks: navLink[] = [
    {
      label: 'Início',
      path: '/',
      icon: 'pi pi-th-large',
      activeIcon: 'pi pi-th-large-alt',
      active: false,
    },
    {
      label: 'Cursos',
      path: '/courses',
      icon: 'pi pi-tablet',
      activeIcon: 'pi pi-tablet-alt',
      active: false,
    },
    {
      label: 'Minhas Aulas',
      path: '/lessons',
      icon: 'pi pi-folder-open',
      activeIcon: 'pi pi-folder-open-alt',
      active: false,
    },
    {
      label: 'Professores',
      path: '/teachers',
      icon: 'pi pi-users',
      activeIcon: 'pi pi-users-alt',
      active: false,
    },
    {
      label: 'Eventos',
      path: '/events',
      icon: 'pi pi-calendar',
      activeIcon: 'pi pi-calendar-alt',
      active: false,
    },
    {
      label: 'Certificados',
      path: '/certificates',
      icon: 'pi pi-graduation-cap',
      activeIcon: 'pi pi-graduation-cap-alt',
      active: false,
    },
    {
      label: 'Ajuda',
      path: '/support',
      icon: 'pi pi-question-circle',
      activeIcon: 'pi pi-question-circle-alt',
      active: false,
    },
  ];

  ngOnInit(): void {
    this.navLinks[0].active = true;
  }

  toggleSidebar() {
    this.isNavBarOpened.set(!this.isNavBarOpened());
  }

  getSideBarIcon() {
    return this.isNavBarOpened() ? 'pi pi-chevron-right' : 'pi pi-chevron-left';
  }

  setActiveTab(tab: navLink) {
    this.navLinks.forEach((link) => (link.active = false));
    tab.active = true;
  }
}
