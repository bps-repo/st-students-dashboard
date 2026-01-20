import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, Subject, takeUntil, debounceTime, filter } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Event, EventType } from '../../core/models/Event';
import { EventsActions } from '../../core/state/events/events.actions';
import { EventsSelectors } from '../../core/state/events/events.selectors';
import { StudentSelectors } from '../../core/state/student/student.selectors';
import { Student } from '../../core/models/Student';

/**
 * Modern Events Component
 *
 * Displays upcoming and past events with pagination and NgRx state management.
 */
@Component({
  selector: 'app-events',
  imports: [CommonModule, FormsModule, PushPipe, LoaderComponent],
  templateUrl: './events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
  // Observables from store
  events$: Observable<Event[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  student$: Observable<Student | null>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  totalElements$: Observable<number>;

  // Event detail modal state
  protected readonly showEventDetails = signal(false);
  protected selectedEvent: Event | null = null;

  // Filter state
  protected activeFilter = 'all';
  protected activeTab = 'all'; // 'all', 'upcoming', 'past', 'my-events'
  protected searchQuery = '';

  // Pagination
  protected pageSize = 9;

  // Infinite scroll
  @ViewChild('scrollSentinel') scrollSentinel?: ElementRef;
  private destroy$ = new Subject<void>();
  private intersectionObserver?: IntersectionObserver;
  private currentPage = 0;
  private totalPages = 1;
  private isLoadingMore = false;

  // Color mapping for event types
  private colorMap: Record<EventType, string> = {
    [EventType.WORKSHOP]: 'primary',
    [EventType.SEMINAR]: 'success',
    [EventType.CONFERENCE]: 'accent',
    [EventType.MEETING]: 'secondary',
    [EventType.TALK]: 'warning',
    [EventType.TOUR]: 'info',
    [EventType.TRAINING]: 'primary',
    [EventType.OTHER]: 'neutral'
  };

  protected EventType = EventType;

  constructor(private store: Store) {
    this.events$ = this.store.select(EventsSelectors.events);
    this.loading$ = this.store.select(EventsSelectors.loading);
    this.error$ = this.store.select(EventsSelectors.error);
    this.student$ = this.store.select(StudentSelectors.student);
    this.currentPage$ = this.store.select(EventsSelectors.currentPage);
    this.totalPages$ = this.store.select(EventsSelectors.totalPages);
    this.totalElements$ = this.store.select(EventsSelectors.totalElements);

    // Subscribe to pagination changes
    this.currentPage$.pipe(takeUntil(this.destroy$)).subscribe(page => {
      this.currentPage = page;
    });

    this.totalPages$.pipe(takeUntil(this.destroy$)).subscribe(total => {
      this.totalPages = total;
    });

    this.loading$.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      this.isLoadingMore = loading;
    });
  }

  ngOnInit(): void {
    // Load first page on component init
    this.loadEvents();
  }

  ngAfterViewInit(): void {
    // Setup intersection observer for infinite scroll
    this.setupInfiniteScroll();
  }

  ngOnDestroy(): void {
    // Cleanup
    this.destroy$.next();
    this.destroy$.complete();

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  /**
   * Setup intersection observer for infinite scroll
   */
  private setupInfiniteScroll(): void {
    if (!this.scrollSentinel) return;

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoadingMore && this.hasMorePages()) {
          this.loadNextPage();
        }
      });
    }, options);

    this.intersectionObserver.observe(this.scrollSentinel.nativeElement);
  }

  /**
   * Check if there are more pages to load
   */
  private hasMorePages(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  /**
   * Load events based on current page
   */
  loadEvents(): void {
    this.store.dispatch(
      EventsActions.loadEvents({ page: 0, size: this.pageSize })
    );
  }

  /**
   * Load specific page
   */
  loadPage(page: number): void {
    this.store.dispatch(
      EventsActions.loadEvents({ page, size: this.pageSize })
    );
  }

  /**
   * Load next page
   */
  loadNextPage(): void {
    this.currentPage$.subscribe(page => {
      this.loadPage(page + 1);
    }).unsubscribe();
  }

  /**
   * Load previous page
   */
  loadPreviousPage(): void {
    this.currentPage$.subscribe(page => {
      this.loadPage(page - 1);
    }).unsubscribe();
  }

  /**
   * Retry loading events
   */
  retry(): void {
    this.loadEvents();
  }

  /**
   * Opens the event details modal for the selected event
   */
  openEventDetails(event: Event): void {
    this.selectedEvent = event;
    this.showEventDetails.set(true);
    this.store.dispatch(EventsActions.selectEvent({ event }));
  }

  /**
   * Closes the event details modal
   */
  closeEventDetails(): void {
    this.showEventDetails.set(false);
    this.selectedEvent = null;
  }

  /**
   * Register for an event
   */
  registerForEvent(eventId: string, eventTitle?: string): void {
    const message = eventTitle
      ? `Tem certeza que deseja se inscrever no evento "${eventTitle}"?`
      : 'Tem certeza que deseja se inscrever neste evento?';

    if (confirm(message)) {
      this.student$.subscribe((student) => {
        if (student?.id) {
          this.store.dispatch(
            EventsActions.registerForEvent({ eventId, studentId: student.id })
          );
        }
      }).unsubscribe();
    }
  }

  /**
   * Cancel registration for an event
   */
  cancelRegistration(eventId: string, eventTitle?: string): void {
    const message = eventTitle
      ? `Tem certeza que deseja cancelar sua inscrição no evento "${eventTitle}"?`
      : 'Tem certeza que deseja cancelar sua inscrição neste evento?';

    if (confirm(message)) {
      this.student$.subscribe((student) => {
        if (student?.id) {
          this.store.dispatch(
            EventsActions.cancelRegistration({ eventId, studentId: student.id })
          );
        }
      }).unsubscribe();
    }
  }

  /**
   * Check if student is registered for an event
   */
  isRegistered(event: Event, studentId: string | undefined): boolean {
    if (!studentId) return false;
    return event.participations.some(p => p.studentId === studentId);
  }

  /**
   * Check if event has capacity
   */
  hasCapacity(event: Event): boolean {
    return event.participations.length < event.maxCapacity;
  }

  /**
   * Get participant count
   */
  getParticipantCount(event: Event): number {
    return event.participations.length;
  }

  /**
   * Filter events by type
   */
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  /**
   * Set active tab (all/upcoming/past)
   */
  setTab(tab: string): void {
    this.activeTab = tab;
  }

  /**
   * Get filtered events based on active filter, tab, and search query
   */
  getFilteredEvents$(): Observable<Event[]> {
    return combineLatest([this.events$, this.student$]).pipe(
      map(([events, student]) => {
        let filtered = events;

        // Apply tab filter (all/upcoming/past/my-events)
        const now = new Date();
        if (this.activeTab === 'upcoming') {
          filtered = filtered.filter(e => new Date(e.startAt) > now);
        } else if (this.activeTab === 'past') {
          filtered = filtered.filter(e => new Date(e.endAt) < now);
        } else if (this.activeTab === 'my-events') {
          // Filter events where the student is registered
          filtered = filtered.filter(e => 
            student?.id && e.participations.some(p => p.studentId === student.id)
          );
        }

        // Apply type filter
        if (this.activeFilter !== 'all') {
          filtered = filtered.filter(e => e.type === this.activeFilter);
        }

        // Apply search filter
        if (this.searchQuery.trim()) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(e =>
            e.title.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query)
          );
        }

        return filtered;
      })
    );
  }

  /**
   * Get color for event type
   */
  getEventColor(type: EventType): string {
    return this.colorMap[type] || 'neutral';
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  /**
   * Format time for display
   */
  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Get event type label in Portuguese
   */
  getEventTypeLabel(type: EventType): string {
    const labels: Record<EventType, string> = {
      [EventType.WORKSHOP]: 'Workshop',
      [EventType.SEMINAR]: 'Seminário',
      [EventType.CONFERENCE]: 'Conferência',
      [EventType.MEETING]: 'Encontro',
      [EventType.TALK]: 'Palestra',
      [EventType.TOUR]: 'Tour',
      [EventType.TRAINING]: 'Treinamento',
      [EventType.OTHER]: 'Evento'
    };
    return labels[type] || 'Evento';
  }

  /**
   * Scroll to top of page
   */
  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
