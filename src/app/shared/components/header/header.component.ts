import {Component, inject, OnInit} from '@angular/core';
import {OverlayComponent} from '../overlay/overlay.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Store} from "@ngrx/store";
import {AuthActions} from "../../../core/state/auth/authActions";
import {UserToken} from "../../../core/models/userToken";
import {authSelectors} from "../../../core/state/auth/auth.selectors";
import {Student} from "../../../core/models/Student";
import {StudentSelectors} from "../../../core/state/student/student.selectors";
import {BreadcrumbComponent} from "../../breadcrumb/breadcrumb.component";
import {Router, NavigationEnd} from "@angular/router";
import {filter} from "rxjs/operators";
import {NotificationsSelectors} from "../../../core/state/notifications/notifications.selectors";
import {NotificationsActions} from "../../../core/state/notifications/notifications.actions";



@Component({
  selector: 'app-header',
  imports: [OverlayComponent, CommonModule, BreadcrumbComponent, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  protected user$!: Observable<UserToken | null>;
  protected studen$!: Observable<Student | null>;
  protected unreadCount$!: Observable<number>;
  private overlayState = new BehaviorSubject<boolean>(false);
  showOverlay$ = this.overlayState.asObservable();
  store$ = inject(Store);
  protected isHomePage = false;

  constructor(private router: Router) {
    this.studen$ = this.store$.select(StudentSelectors.student);
    this.unreadCount$ = this.store$.select(NotificationsSelectors.unreadCount);

    // Listen to route changes to detect home page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomePage = event.url === '/home' || event.url === '/';
    });
  }

  toggleOverlay() {
    const currentState = this.overlayState.getValue();
    this.overlayState.next(!currentState);
  }

  onLogout() {
    this.store$.dispatch(AuthActions.logout())
  }

  goBack() {
    window.history.back();
  }

  ngOnInit() {
    this.user$ = this.store$.select((state) => state.auth.user);
    // Check initial route
    this.isHomePage = this.router.url === '/home' || this.router.url === '/';
    // Load notifications
    this.store$.dispatch(NotificationsActions.loadNotifications());
  }
}
