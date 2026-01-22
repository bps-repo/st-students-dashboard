import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../../core/models/Student';
import { StudentSelectors } from '../../../core/state/student/student.selectors';
import { NotificationsSelectors } from '../../../core/state/notifications/notifications.selectors';
import { NotificationsActions } from '../../../core/state/notifications/notifications.actions';
import { MobileSidebarService } from '../../services/mobile-sidebar.service';

@Component({
    selector: 'app-header-on-small',
    imports: [CommonModule, RouterModule],
    templateUrl: './header-on-small.component.html'
})
export class HeaderOnSmallComponent implements OnInit {
    protected student$!: Observable<Student | null>;
    protected unreadCount$!: Observable<number>;
    private store$ = inject(Store);
    protected mobileSidebarService = inject(MobileSidebarService);

    ngOnInit(): void {
        this.student$ = this.store$.select(StudentSelectors.student);
        this.unreadCount$ = this.store$.select(NotificationsSelectors.unreadCount);
        // Load notifications
        this.store$.dispatch(NotificationsActions.loadNotifications());
    }

    toggleMobileSidebar(): void {
        this.mobileSidebarService.toggle();
    }
}
