import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

interface navLink {
  label: string;
  path: string;
  icon: string;
  activeIcon?: string;
  active: boolean;
}
@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  isNavBarOpened = signal(false);

  constructor(private localStorageService: LocalstorageService) {}

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

  get activeTab(): boolean {
    const activeTab = this.localStorageService.getItem('activeTab');
    return activeTab ?? this.navLinks[0].active;
  }

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
    // Reset all active tabs to false before setting the new active tab to true.
    this.navLinks.forEach((link) => (link.active = false));
    // Set the active tab to the clicked tab.
    tab.active = true;

    // Save the active tab in local storage.
    this.localStorageService.setItem('activeTab', tab);
  }
}
