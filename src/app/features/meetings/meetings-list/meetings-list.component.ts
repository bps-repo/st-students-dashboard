import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meeting, MeetingStatus } from '../../../core/models/Meeting';
import { StudentSelectors } from '../../../core/state/student/student.selectors';
import { MeetingsActions } from '../../../core/state/meetings/meetings.actions';
import { MeetingsSelectors, MeetingsEntitySelectors } from '../../../core/state/meetings/meetings.selectors';

@Component({
  selector: 'app-meetings-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnInit {
  // Meetings from store
  meetings$!: Observable<Meeting[]>;
  filteredMeetings$!: Observable<Meeting[]>;

  // Loading states from store
  isLoading$!: Observable<boolean>;

  // Current user ID and student ID
  private userId?: string;
  private studentId?: string;

  // Local filters
  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';

  // Enums for template
  MeetingStatus = MeetingStatus;

  // Status options for filter
  statusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: MeetingStatus.REQUESTED, label: 'Solicitada' },
    { value: MeetingStatus.CONFIRMED, label: 'Confirmada' },
    { value: MeetingStatus.CANCELLED, label: 'Cancelada' },
    { value: MeetingStatus.COMPLETED, label: 'Concluída' }
  ];

  constructor(private store: Store) {
    // Initialize observables from store
    this.meetings$ = this.store.select(MeetingsEntitySelectors.selectAllMeetings);
    this.isLoading$ = this.store.select(MeetingsSelectors.selectMeetingsLoading);

    // Initialize filtered meetings observable
    this.filteredMeetings$ = this.meetings$.pipe(
      map((meetings: Meeting[]) => {
        let filtered = meetings;

        if (this.selectedStatus) {
          filtered = filtered.filter((meeting: Meeting) => meeting.status === this.selectedStatus);
        }

        if (this.startDate) {
          const start = new Date(this.startDate);
          filtered = filtered.filter((meeting: Meeting) => new Date(meeting.startAt) >= start);
        }

        if (this.endDate) {
          const end = new Date(this.endDate);
          end.setHours(23, 59, 59, 999); // End of day
          filtered = filtered.filter((meeting: Meeting) => new Date(meeting.startAt) <= end);
        }

        return filtered;
      })
    );

    // Subscribe to student state to get the current user ID
    this.store.select(StudentSelectors.student).subscribe(student => {
      this.studentId = student?.id;
      this.userId = student?.user?.id;
      if (this.studentId) {
        // Load meetings for current student
        this.loadMeetings();
      }
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  /**
   * Load meetings from the API using NgRx
   */
  loadMeetings(): void {
    if (!this.studentId) return;

    const filters: any = {
      studentId: this.studentId
    };

    if (this.startDate) {
      filters.startAt = new Date(this.startDate).toISOString();
    }

    if (this.endDate) {
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999);
      filters.endAt = end.toISOString();
    }

    this.store.dispatch(MeetingsActions.loadMeetings({ filters }));
  }

  /**
   * Handle status filter change
   */
  onStatusFilterChange(): void {
    // Recreate filtered meetings observable with new filter
    this.filteredMeetings$ = this.meetings$.pipe(
      map((meetings: Meeting[]) => {
        let filtered = meetings;

        if (this.selectedStatus) {
          filtered = filtered.filter((meeting: Meeting) => meeting.status === this.selectedStatus);
        }

        if (this.startDate) {
          const start = new Date(this.startDate);
          filtered = filtered.filter((meeting: Meeting) => new Date(meeting.startAt) >= start);
        }

        if (this.endDate) {
          const end = new Date(this.endDate);
          end.setHours(23, 59, 59, 999);
          filtered = filtered.filter((meeting: Meeting) => new Date(meeting.startAt) <= end);
        }

        return filtered;
      })
    );
  }

  /**
   * Handle date filter change
   */
  onDateFilterChange(): void {
    this.loadMeetings();
  }

  /**
   * Get status badge class based on meeting status
   */
  getStatusBadgeClass(status: MeetingStatus): string {
    switch (status) {
      case MeetingStatus.REQUESTED:
        return 'bg-yellow-100 text-yellow-700';
      case MeetingStatus.CONFIRMED:
        return 'bg-green-100 text-green-700';
      case MeetingStatus.CANCELLED:
        return 'bg-red-100 text-red-700';
      case MeetingStatus.COMPLETED:
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  }

  /**
   * Get status label in Portuguese
   */
  getStatusLabel(status: MeetingStatus): string {
    switch (status) {
      case MeetingStatus.REQUESTED:
        return 'Solicitada';
      case MeetingStatus.CONFIRMED:
        return 'Confirmada';
      case MeetingStatus.CANCELLED:
        return 'Cancelada';
      case MeetingStatus.COMPLETED:
        return 'Concluída';
      default:
        return status;
    }
  }

  /**
   * Format date to Portuguese format
   */
  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Format date only (without time)
   */
  formatDateOnly(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Check if meeting can be cancelled
   */
  canCancel(meeting: Meeting): boolean {
    return meeting.status === MeetingStatus.REQUESTED || meeting.status === MeetingStatus.CONFIRMED;
  }

  /**
   * Cancel a meeting
   */
  cancelMeeting(meetingId: string): void {
    if (confirm('Tem certeza que deseja cancelar esta reunião?')) {
      this.store.dispatch(MeetingsActions.cancelMeeting({ meetingId }));
    }
  }
}
