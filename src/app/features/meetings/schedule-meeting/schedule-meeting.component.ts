import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../../../core/services/employee.service';
import { AlertService } from '../../../core/services/alert.service';
import { Meeting, MeetingStatus, CreateMeetingPayload } from '../../../core/models/Meeting';
import { Employee } from '../../../core/models/Employee';
import { StudentSelectors } from '../../../core/state/student/student.selectors';
import { MeetingsActions } from '../../../core/state/meetings/meetings.actions';
import { MeetingsSelectors, MeetingsEntitySelectors } from '../../../core/state/meetings/meetings.selectors';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.scss']
})
export class ScheduleMeetingComponent implements OnInit {
  // Loading states from store
  isSubmitting$!: Observable<boolean>;

  // Employees
  employees: Employee[] = [];
  isLoadingEmployees = false;

  // Current user ID and student ID
  private userId?: string;
  private studentId?: string;

  // Form data
  formData = {
    employeeId: '',
    startAt: '',
    endAt: '',
    purpose: '',
    online: true,
    onlineLink: '',
    location: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private store: Store
  ) {
    // Initialize observables from store
    this.isSubmitting$ = this.store.select(MeetingsSelectors.selectIsSubmitting);

    // Subscribe to student state to get the current user ID
    this.store.select(StudentSelectors.student).subscribe(student => {
      this.studentId = student?.id;
      this.userId = student?.user?.id;
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  /**
   * Load employees for selection dropdown
   */
  loadEmployees(): void {
    this.isLoadingEmployees = true;
    this.employeeService.getActiveEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.isLoadingEmployees = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.isLoadingEmployees = false;
        this.alertService.error('Erro ao carregar funcionários. Por favor, tente novamente.');
      }
    });
  }

  /**
   * Get employee full name
   */
  getEmployeeFullName(employee: Employee): string {
    return this.employeeService.getEmployeeFullName(employee);
  }

  /**
   * Handle online/offline toggle
   */
  onOnlineToggle(): void {
    if (!this.formData.online) {
      this.formData.onlineLink = '';
    } else {
      this.formData.location = '';
    }
  }

  /**
   * Submits the meeting form using NgRx
   */
  submitForm(): void {
    if (!this.formData.employeeId || !this.formData.startAt || !this.formData.endAt || !this.formData.purpose) {
      this.alertService.warning('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.userId || !this.studentId) {
      this.alertService.error('Erro: Não foi possível identificar o usuário. Por favor, faça login novamente.');
      return;
    }

    // Validate dates
    const startDate = new Date(this.formData.startAt);
    const endDate = new Date(this.formData.endAt);

    if (endDate <= startDate) {
      this.alertService.warning('A data/hora de término deve ser posterior à data/hora de início.');
      return;
    }

    if (startDate < new Date()) {
      this.alertService.warning('A data/hora de início não pode ser no passado.');
      return;
    }

    // Validate online meeting
    if (this.formData.online && !this.formData.onlineLink) {
      this.alertService.warning('Por favor, forneça o link da reunião online.');
      return;
    }

    // Validate offline meeting
    if (!this.formData.online && !this.formData.location) {
      this.alertService.warning('Por favor, forneça o local da reunião.');
      return;
    }

    const newMeeting: CreateMeetingPayload = {
      studentId: this.studentId,
      employeeId: this.formData.employeeId,
      createdByUserId: this.userId,
      startAt: startDate.toISOString(),
      endAt: endDate.toISOString(),
      purpose: this.formData.purpose,
      online: this.formData.online,
      onlineLink: this.formData.online ? this.formData.onlineLink : undefined,
      location: !this.formData.online ? this.formData.location : undefined,
      status: MeetingStatus.REQUESTED
    };

    // Dispatch create action
    this.store.dispatch(MeetingsActions.createMeeting({ meeting: newMeeting }));

    // Monitor submission state
    let wasSubmitting = false;
    const subscription = combineLatest([
      this.store.select(MeetingsSelectors.selectIsSubmitting),
      this.store.select(MeetingsSelectors.selectMeetingsError)
    ]).subscribe(([isSubmitting, error]: [boolean, string | null]) => {
      if (wasSubmitting && !isSubmitting) {
        // Submission completed
        if (error) {
          this.alertService.error('Erro ao agendar a reunião. Por favor, tente novamente.');
        } else {
          // Success - reset form
          this.formData.employeeId = '';
          this.formData.startAt = '';
          this.formData.endAt = '';
          this.formData.purpose = '';
          this.formData.online = true;
          this.formData.onlineLink = '';
          this.formData.location = '';
          this.alertService.success('Reunião agendada com sucesso! Aguarde a confirmação.');
        }
        subscription.unsubscribe();
      }
      wasSubmitting = isSubmitting;
    });
  }

  /**
   * Format date for input field
   */
  getCurrentDateTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

  /**
   * Get minimum datetime for end date (start date + 1 hour)
   */
  getMinEndDateTime(): string {
    if (!this.formData.startAt) return '';
    const startDate = new Date(this.formData.startAt);
    startDate.setHours(startDate.getHours() + 1);
    return startDate.toISOString().slice(0, 16);
  }
}
