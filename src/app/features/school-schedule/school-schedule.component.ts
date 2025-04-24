import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

interface CalendarEvent {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  teacher: string;
  room?: string;
  color?: string;
}

@Component({
  selector: 'app-school-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-schedule.component.html',
  styleUrls: []
})
export class SchoolScheduleComponent implements OnInit {
  // Calendar data
  calendarDays: CalendarDay[] = [];
  weekDayNames: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  // Current date tracking
  currentDate: Date = new Date();
  currentMonth: number;
  currentYear: number;

  // Events data
  events: CalendarEvent[] = [];

  constructor() {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendarDays();
    this.loadEvents();
  }

  // Generate the calendar days for the current month
  generateCalendarDays(): void {
    this.calendarDays = [];

    // Get the first day of the month
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);

    // Get the last day of the month
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    const prevMonthYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    const lastDayOfPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(prevMonthYear, prevMonth, lastDayOfPrevMonth - i);
      this.calendarDays.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: false,
        isToday: this.isToday(date),
        events: []
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      this.calendarDays.push({
        date,
        dayNumber: i,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        events: []
      });
    }

    // Calculate days from next month to show to complete the grid (6 rows x 7 columns = 42 cells)
    const totalDaysToShow = 42;
    const daysFromNextMonth = totalDaysToShow - this.calendarDays.length;
    const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    const nextMonthYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;

    // Add days from next month
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(nextMonthYear, nextMonth, i);
      this.calendarDays.push({
        date,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        events: []
      });
    }
  }

  // Check if a date is today
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  // Navigate to the previous month
  navigateToPreviousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDays();
    this.loadEvents();
  }

  // Navigate to the next month
  navigateToNextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays();
    this.loadEvents();
  }

  // Get the month and year label (e.g., "April 2023")
  getMonthYearLabel(): string {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return `${monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  // Load events for the current month
  loadEvents(): void {
    // In a real application, this data would come from a service
    // For now, we'll use mock data
    const mockEvents: CalendarEvent[] = [
      {
        id: 1,
        title: 'Gramática Avançada',
        startDate: new Date(this.currentYear, this.currentMonth, 10, 9, 0),
        endDate: new Date(this.currentYear, this.currentMonth, 10, 10, 30),
        teacher: 'Prof. Silva',
        color: 'bg-blue-100'
      },
      {
        id: 2,
        title: 'Conversação',
        startDate: new Date(this.currentYear, this.currentMonth, 15, 14, 0),
        endDate: new Date(this.currentYear, this.currentMonth, 15, 15, 30),
        teacher: 'Prof. Santos',
        color: 'bg-green-100'
      },
      {
        id: 3,
        title: 'Listening Comprehension',
        startDate: new Date(this.currentYear, this.currentMonth, 20, 19, 0),
        endDate: new Date(this.currentYear, this.currentMonth, 20, 20, 30),
        teacher: 'Prof. Johnson',
        color: 'bg-purple-100'
      },
      {
        id: 4,
        title: 'Business English',
        startDate: new Date(this.currentYear, this.currentMonth, 25, 10, 0),
        endDate: new Date(this.currentYear, this.currentMonth, 25, 11, 30),
        teacher: 'Prof. Oliveira',
        color: 'bg-yellow-100'
      },
      {
        id: 5,
        title: 'Preparação para TOEFL',
        startDate: new Date(this.currentYear, this.currentMonth, 5, 16, 0),
        endDate: new Date(this.currentYear, this.currentMonth, 7, 17, 30),
        teacher: 'Prof. Garcia',
        room: 'Sala 302',
        color: 'bg-red-100'
      }
    ];

    // Clear existing events from calendar days
    this.calendarDays.forEach(day => {
      day.events = [];
    });

    // Assign events to calendar days
    mockEvents.forEach(event => {
      // For multi-day events, add to all days between start and end
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      // Reset hours to compare just the dates
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // Loop through all days in the calendar
      this.calendarDays.forEach(day => {
        const calendarDate = new Date(day.date);
        calendarDate.setHours(0, 0, 0, 0);

        // If the calendar day is between start and end dates (inclusive), add the event
        if (calendarDate >= startDate && calendarDate <= endDate) {
          day.events.push(event);
        }
      });
    });
  }

  // Get formatted time for an event (e.g., "09:00 - 10:30")
  getEventTimeString(event: CalendarEvent): string {
    const startHours = event.startDate.getHours().toString().padStart(2, '0');
    const startMinutes = event.startDate.getMinutes().toString().padStart(2, '0');
    const endHours = event.endDate.getHours().toString().padStart(2, '0');
    const endMinutes = event.endDate.getMinutes().toString().padStart(2, '0');

    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
  }

  // Check if an event spans multiple days
  isMultiDayEvent(event: CalendarEvent): boolean {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    // Reset hours to compare just the dates
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return startDate.getTime() !== endDate.getTime();
  }

  // Get events for a specific day
  getEventsForDay(day: CalendarDay): CalendarEvent[] {
    return day.events;
  }

  // Format date as DD/MM
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }

  // Get the first day of an event for a specific calendar day
  isFirstDayOfEvent(day: CalendarDay, event: CalendarEvent): boolean {
    const eventStartDate = new Date(event.startDate);
    eventStartDate.setHours(0, 0, 0, 0);

    const calendarDate = new Date(day.date);
    calendarDate.setHours(0, 0, 0, 0);

    return eventStartDate.getTime() === calendarDate.getTime();
  }

  // Get the last day of an event for a specific calendar day
  isLastDayOfEvent(day: CalendarDay, event: CalendarEvent): boolean {
    const eventEndDate = new Date(event.endDate);
    eventEndDate.setHours(0, 0, 0, 0);

    const calendarDate = new Date(day.date);
    calendarDate.setHours(0, 0, 0, 0);

    return eventEndDate.getTime() === calendarDate.getTime();
  }

  // Calculate how many days an event spans
  getEventDuration(event: CalendarEvent): number {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    // Reset hours to compare just the dates
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // Calculate difference in days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1; // +1 because it's inclusive
  }
}
