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
    },
    {
      label: 'Calendário',
      path: '/calendar',
      icon: 'pi pi-folder-open',
      activeIcon: 'pi pi-folder-open-alt',
    },
    {
      label: 'Aulas',
      path: '/lessons',
      icon: 'pi pi-tablet',
      activeIcon: 'pi pi-tablet-alt',
    },
    {
      label: 'Professores',
      path: '/teachers',
      icon: 'pi pi-users',
      activeIcon: 'pi pi-users-alt',
    },
    {
      label: 'Eventos',
      path: '/events',
      icon: 'pi pi-calendar',
      activeIcon: 'pi pi-calendar-alt',
    },
    {
      label: 'Certificados',
      path: '/certificates',
      icon: 'pi pi-graduation-cap',
      activeIcon: 'pi pi-graduation-cap-alt',
    },
    {
      label: 'Financeiro',
      path: '/finance',
      icon: 'pi pi-wallet',
      activeIcon: 'pi pi-wallet',
    },
    {
      label: 'Chat AI',
      path: '/chat',
      icon: 'pi pi-sparkles',
      activeIcon: 'pi pi-sparkles',
    },
    {
      label: 'Reuniões',
      path: '/meetings',
      icon: 'pi pi-calendar',
      activeIcon: 'pi pi-calendar-alt',
    },
    {
      label: 'Suporte',
      path: '/support',
      icon: 'pi pi-question-circle',
      activeIcon: 'pi pi-question-circle-alt',
    },
  ];

  isVipStudent(): Observable<boolean> {
    return this.student$.pipe(
      map(student => student?.vip === true && student?.directChatEnabled === true)
    );
  }

  ngOnInit(): void {
    this.student$ = this.store$.select(StudentSelectors.student)
  }

  toggleSidebar() {
    this.isNavBarOpened.set(!this.isNavBarOpened());
  }

  getSideBarIcon() {
    return this.isNavBarOpened() ? 'pi pi-chevron-right' : 'pi pi-chevron-left';
  }

  onNavLinkClick(): void {
    // Close mobile sidebar when navigating
    this.mobileSidebarService.close();
  }

  protected readonly window = window;
}
