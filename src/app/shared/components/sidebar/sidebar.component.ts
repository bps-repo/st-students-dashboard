import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { LevelSelectors } from "../../../core/state/level/level.selectors";
import { Level } from "../../../core/models/Level";
import { StudentSelectors } from "../../../core/state/student/student.selectors";
import { Student } from "../../../core/models/Student";
import { MobileSidebarService } from '../../services/mobile-sidebar.service';

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
  loading$!: Observable<boolean>
  level$!: Observable<Level | null>
  isNavBarOpened = signal(false);
  student$!: Observable<Student | null>;
  private mobileSidebarService = inject(MobileSidebarService);

  constructor(private localStorageService: LocalstorageService, private store$: Store<any>) {
    this.level$ = store$.select(LevelSelectors.levelStudent);
    this.loading$ = store$.select(LevelSelectors.loading);
  }

  navLinks: navLink[] = [
    {
      label: 'Início',
      path: '/',
      icon: 'pi pi-th-large',
      activeIcon: 'pi pi-th-large-alt',
      active: false,
    },
    {
      label: 'Calendário',
      path: '/calendar',
      icon: 'pi pi-folder-open',
      activeIcon: 'pi pi-folder-open-alt',
      active: false,
    },
    {
      label: 'Aulas',
      path: '/lessons',
      icon: 'pi pi-tablet',
      activeIcon: 'pi pi-tablet-alt',
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
      label: 'Financeiro',
      path: '/finance',
      icon: 'pi pi-wallet',
      activeIcon: 'pi pi-wallet',
      active: false,
    },
    {
      label: 'Chat AI',
      path: '/chat',
      icon: 'pi pi-sparkles',
      activeIcon: 'pi pi-sparkles',
      active: false,
    },
    {
      label: 'Reuniões',
      path: '/meetings',
      icon: 'pi pi-calendar',
      activeIcon: 'pi pi-calendar-alt',
      active: false,
    },
    {
      label: 'Suporte',
      path: '/support',
      icon: 'pi pi-question-circle',
      activeIcon: 'pi pi-question-circle-alt',
      active: false,
    },
  ];

  isVipStudent(): Observable<boolean> {
    return this.student$.pipe(
      map(student => student?.vip === true && student?.directChatEnabled === true)
    );
  }

  get activeTab(): boolean {
    const activeTab = this.localStorageService.getItem('activeTab');
    return activeTab ?? this.navLinks[0].active;
  }

  ngOnInit(): void {
    this.navLinks[0].active = true;
    this.student$ = this.store$.select(StudentSelectors.student)
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

    // Close mobile sidebar when navigating
    this.mobileSidebarService.close();
  }

  protected readonly window = window;
}
