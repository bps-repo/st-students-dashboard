import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../../core/services/employee.service';
import { AlertService } from '../../core/services/alert.service';
import { SupportTicket, SupportTicketStatus, SupportTicketPriority, SupportTicketFilters } from '../../core/models/SupportTicket';
import { Employee } from '../../core/models/Employee';
import { StudentSelectors } from '../../core/state/student/student.selectors';
import { SupportTicketsActions } from '../../core/state/support-tickets/support-tickets.actions';
import { SupportTicketsSelectors, SupportTicketsEntitySelectors } from '../../core/state/support-tickets/support-tickets.selectors';

/**
 * Modern Support Component
 *
 * Provides a contact form for users to get help and support
 * with a modern, responsive design.
 */
@Component({
  selector: 'app-support',
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
})
export class SupportComponent implements OnInit {
  // Support tickets from store
  supportTickets$!: Observable<SupportTicket[]>;
  filteredTickets$!: Observable<SupportTicket[]>;

  // Loading states from store
  isLoadingTickets$!: Observable<boolean>;
  isSubmitting$!: Observable<boolean>;

  // Employees
  employees: Employee[] = [];
  isLoadingEmployees = false;

  // Current user ID and student ID
  private userId?: string;
  private studentId?: string;

  // Local filters
  selectedStatus: string = '';

  // Enums for template
  SupportTicketStatus = SupportTicketStatus;
  SupportTicketPriority = SupportTicketPriority;

  // Form data
  formData = {
    subject: '',
    description: '',
    priority: SupportTicketPriority.MEDIUM,
    assignedToEmployeeId: ''
  };

  // Support categories
  supportCategories = [
    { id: 'technical', label: 'Suporte Técnico', icon: 'pi pi-cog', active: true },
    { id: 'other', label: 'Outros Assuntos', icon: 'pi pi-question-circle', active: false }
  ];

  // Status options for filter
  statusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: SupportTicketStatus.OPEN, label: 'Aberto' },
    { value: SupportTicketStatus.IN_PROGRESS, label: 'Em Progresso' },
    { value: SupportTicketStatus.RESOLVED, label: 'Resolvido' },
    { value: SupportTicketStatus.CLOSED, label: 'Fechado' }
  ];

  // Priority options
  priorityOptions = [
    { value: SupportTicketPriority.LOW, label: 'Baixa' },
    { value: SupportTicketPriority.MEDIUM, label: 'Média' },
    { value: SupportTicketPriority.HIGH, label: 'Alta' },
    { value: SupportTicketPriority.URGENT, label: 'Urgente' }
  ];

  // FAQ items
  faqItems = [
    {
      question: 'Como posso agendar uma aula particular?',
      answer: 'Para agendar uma aula particular, acesse a seção "Professores", escolha o professor desejado e clique em "Agendar Aula".',
      expanded: false
    },
    {
      question: 'Como alterar minha senha?',
      answer: 'Acesse seu perfil no canto superior direito da tela, selecione "Configurações" e depois "Alterar Senha".',
      expanded: false
    },
    {
      question: 'Posso acessar as aulas em dispositivos móveis?',
      answer: 'Sim, nossa plataforma é responsiva e pode ser acessada em qualquer dispositivo com navegador web.',
      expanded: false
    },
    {
      question: 'Como obtenho meu certificado?',
      answer: 'Após concluir um nível, acesse a seção "Certificados" e clique em "Baixar Certificado" no nível correspondente.',
      expanded: false
    }
  ];

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private store: Store
  ) {
    // Initialize observables from store
    this.supportTickets$ = this.store.select(SupportTicketsEntitySelectors.selectAllSupportTickets);
    this.isLoadingTickets$ = this.store.select(SupportTicketsSelectors.selectSupportTicketsLoading);
    this.isSubmitting$ = this.store.select(SupportTicketsSelectors.selectIsSubmitting);

    // Initialize filtered tickets observable
    this.filteredTickets$ = this.supportTickets$.pipe(
      map((tickets: SupportTicket[]) => {
        if (this.selectedStatus) {
          return tickets.filter((ticket: SupportTicket) => ticket.status === this.selectedStatus);
        }
        return tickets;
      })
    );

    // Subscribe to student state to get the current user ID
    this.store.select(StudentSelectors.student).subscribe(student => {
      this.studentId = student?.id;
      this.userId = student?.user?.id;
      if (this.userId) {
        // Load tickets for current user
        this.loadSupportTickets();
      }
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  /**
   * Load employees for assignment dropdown
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
   * Load support tickets from the API using NgRx
   */
  loadSupportTickets(): void {
    if (!this.userId) return;

    const filters: SupportTicketFilters = {
      requesterId: this.userId
    };

    this.store.dispatch(SupportTicketsActions.loadSupportTickets({ filters }));
  }

  /**
   * Handle status filter change
   */
  onStatusFilterChange(): void {
    // Recreate filtered tickets observable with new filter
    this.filteredTickets$ = this.supportTickets$.pipe(
      map((tickets: SupportTicket[]) => {
        if (this.selectedStatus) {
          return tickets.filter((ticket: SupportTicket) => ticket.status === this.selectedStatus);
        }
        return tickets;
      })
    );
  }

  /**
   * Get status badge class based on ticket status
   */
  getStatusBadgeClass(status: SupportTicketStatus): string {
    switch (status) {
      case SupportTicketStatus.OPEN:
        return 'bg-primary-100 text-primary-700';
      case SupportTicketStatus.IN_PROGRESS:
        return 'bg-warning-100 text-warning-700';
      case SupportTicketStatus.RESOLVED:
        return 'bg-success-100 text-success-700';
      case SupportTicketStatus.CLOSED:
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  }

  /**
   * Get priority badge class based on ticket priority
   */
  getPriorityBadgeClass(priority: SupportTicketPriority): string {
    switch (priority) {
      case SupportTicketPriority.LOW:
        return 'bg-blue-100 text-blue-700';
      case SupportTicketPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-700';
      case SupportTicketPriority.HIGH:
        return 'bg-orange-100 text-orange-700';
      case SupportTicketPriority.URGENT:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  }

  /**
   * Get status label in Portuguese
   */
  getStatusLabel(status: SupportTicketStatus): string {
    switch (status) {
      case SupportTicketStatus.OPEN:
        return 'Aberto';
      case SupportTicketStatus.IN_PROGRESS:
        return 'Em Progresso';
      case SupportTicketStatus.RESOLVED:
        return 'Resolvido';
      case SupportTicketStatus.CLOSED:
        return 'Fechado';
      default:
        return status;
    }
  }

  /**
   * Get priority label in Portuguese
   */
  getPriorityLabel(priority: SupportTicketPriority): string {
    switch (priority) {
      case SupportTicketPriority.LOW:
        return 'Baixa';
      case SupportTicketPriority.MEDIUM:
        return 'Média';
      case SupportTicketPriority.HIGH:
        return 'Alta';
      case SupportTicketPriority.URGENT:
        return 'Urgente';
      default:
        return priority;
    }
  }

  /**
   * Toggles the expanded state of a FAQ item
   * @param item The FAQ item to toggle
   */
  toggleFaq(item: any): void {
    item.expanded = !item.expanded;
  }

  /**
   * Sets the active support category
   * @param categoryId The ID of the category to set as active
   */
  setActiveCategory(categoryId: string): void {
    this.supportCategories.forEach(category => {
      category.active = category.id === categoryId;
    });
  }

  /**
   * Submits the support form using NgRx
   */
  submitForm(): void {
    if (!this.formData.subject || !this.formData.description) {
      this.alertService.warning('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.userId) {
      this.alertService.error('Erro: Não foi possível identificar o usuário. Por favor, faça login novamente.');
      return;
    }

    const newTicket: Partial<SupportTicket> = {
      requesterId: this.userId,
      subject: this.formData.subject,
      description: this.formData.description,
      priority: this.formData.priority,
      status: SupportTicketStatus.OPEN,
      ...(this.formData.assignedToEmployeeId && { assignedToEmployeeId: this.formData.assignedToEmployeeId })
    };

    // Dispatch create action
    this.store.dispatch(SupportTicketsActions.createSupportTicket({ ticket: newTicket }));

    // Monitor submission state
    let wasSubmitting = false;
    const subscription = combineLatest([
      this.store.select(SupportTicketsSelectors.selectIsSubmitting),
      this.store.select(SupportTicketsSelectors.selectSupportTicketsError)
    ]).subscribe(([isSubmitting, error]: [boolean, string | null]) => {
      if (wasSubmitting && !isSubmitting) {
        // Submission completed
        if (error) {
          this.alertService.error('Erro ao criar o ticket. Por favor, tente novamente.');
        } else {
          // Success - reset form
          this.formData.subject = '';
          this.formData.description = '';
          this.formData.priority = SupportTicketPriority.MEDIUM;
          this.formData.assignedToEmployeeId = '';
          this.alertService.success('Seu ticket foi criado com sucesso! Entraremos em contato em breve.');
        }
        subscription.unsubscribe();
      }
      wasSubmitting = isSubmitting;
    });
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
}
