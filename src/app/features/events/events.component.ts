import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FlashCard } from '../@types/flash-card';
import { TabMenuComponent } from '../../shared/components/tab-menu/tab-menu.component';
import { TabMenuConfig } from '../@types/tab-menu';
import { FlashCardComponent } from '../../shared/components/flash-card/flash-card.component';
import { FormsModule } from '@angular/forms';

/**
 * Modern Events Component
 *
 * Displays upcoming and past events with a modern, responsive design.
 */
@Component({
    selector: 'app-events',
    imports: [CommonModule, TabMenuComponent, FormsModule],
    templateUrl: './events.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  // Event detail modal state
  protected readonly showEventDetails = signal(false);
  protected selectedEvent: FlashCard | null = null;

  // Filter state
  protected activeFilter = 'all';
  protected searchQuery = '';

  // Event data
  protected events: FlashCard[] = [
    {
      color: 'primary',
      image: '/users/1.png',
      title: 'Meeting with Foreigner Speakers',
      date: '27 Oct 2024',
      time: '19:00',
      level: 'Beginner',
      participants: 8,
      location: 'Online - Zoom',
      description: 'Practice your English with native speakers from the USA and UK. This is a great opportunity to improve your conversation skills.',
      organizer: 'ST Andrews',
      status: 'upcoming',
      type: 'conversation'
    },
    {
      color: 'success',
      image: '/users/2.png',
      title: 'Business English Workshop',
      date: '15 Nov 2024',
      time: '18:30',
      level: 'Intermediate',
      participants: 12,
      location: 'Room 302',
      description: 'Learn essential vocabulary and expressions for business meetings, emails, and presentations.',
      organizer: 'ST Andrews',
      status: 'upcoming',
      type: 'workshop'
    },
    {
      color: 'accent',
      image: '/users/3.png',
      title: 'TOEFL Preparation Session',
      date: '05 Dec 2024',
      time: '17:00',
      level: 'Advanced',
      participants: 15,
      location: 'Room 201',
      description: 'Get ready for your TOEFL exam with our expert teachers. We will cover all sections of the test.',
      organizer: 'ST Andrews',
      status: 'upcoming',
      type: 'lecture'
    },
    {
      color: 'secondary',
      image: '/users/2.png',
      title: 'English Movie Night',
      date: '10 Dec 2024',
      time: '20:00',
      level: 'All Levels',
      participants: 25,
      location: 'Auditorium',
      description: 'Watch an English movie with subtitles and discuss it afterward. A fun way to improve your listening skills!',
      organizer: 'ST Andrews',
      status: 'upcoming',
      type: 'other'
    },
    {
      color: 'warning',
      image: '/users/1.png',
      title: 'Pronunciation Workshop',
      date: '18 Dec 2024',
      time: '16:30',
      level: 'Intermediate',
      participants: 10,
      location: 'Room 105',
      description: 'Focus on improving your English pronunciation with practical exercises and feedback.',
      organizer: 'ST Andrews',
      status: 'upcoming',
      type: 'workshop'
    },
    {
      color: 'info',
      image: '/users/3.png',
      title: 'English Book Club',
      date: '22 Dec 2024',
      time: '18:00',
      level: 'Advanced',
      participants: 8,
      location: 'Library',
      description: 'Join our book club to discuss English literature and improve your reading comprehension.',
      organizer: 'ST Andrews',
      status: 'upcoming',
      type: 'meeting'
    },
  ];

  // Tab menu configuration
  protected tabConfig: TabMenuConfig = {
    mainTab: 'Todos os eventos',
    tabs: ['Próximos eventos', 'Eventos passados'],
    actionButtons: [],
  };

  /**
   * Opens the event details modal for the selected event
   * @param event The event to display details for
   */
  openEventDetails(event: FlashCard): void {
    this.selectedEvent = event;
    this.showEventDetails.set(true);
  }

  /**
   * Filters events by type
   * @param filter The filter to apply ('all', 'workshop', 'meeting', etc.)
   */
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  /**
   * Gets the filtered events based on the active filter and search query
   * @returns Filtered array of events
   */
  getFilteredEvents(): FlashCard[] {
    let filtered = this.events;

    // Apply type filter
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(event => event.type === this.activeFilter);
    }

    // Apply search filter if there's a query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.organizer?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }
}
