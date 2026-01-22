import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../../core/models/Student';
import { StudentSelectors } from '../../../core/state/student/student.selectors';
import { MobileSidebarService } from '../../services/mobile-sidebar.service';

@Component({
    selector: 'app-header-on-small',
    imports: [CommonModule],
    templateUrl: './header-on-small.component.html'
})
export class HeaderOnSmallComponent implements OnInit {
    protected student$!: Observable<Student | null>;
    private store$ = inject(Store);
    protected mobileSidebarService = inject(MobileSidebarService);

    ngOnInit(): void {
        this.student$ = this.store$.select(StudentSelectors.student);
    }

    toggleMobileSidebar(): void {
        this.mobileSidebarService.toggle();
    }
}
