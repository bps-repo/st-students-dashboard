import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from "@angular/router";

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
  imports: [CommonModule, RouterModule],
  templateUrl: './lesson-schedule.component.html',
  styleUrls: []
})
export class LessonScheduleComponent implements OnInit {
  // Calendar data
  calendarDays: CalendarDay[] = [];
  weekDayNames: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  // Current date tracking
  currentDate: Date = new Date();
  currentMonth: number;
  currentYear: number;
  weekStartDate!: Date;

  // Time range for the schedule (8:00 AM to 9:00 PM)
  startHour: number = 8;
  endHour: number = 21;
  hourHeight: number = 60; // Height in pixels for each hour block

  // Events data
  events: CalendarEvent[] = [];

  constructor(private  router: Router) {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.initializeWeekStartDate();
  }

  // Initialize the week start date to the Monday of the current week
  initializeWeekStartDate(): void {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate days to subtract to get to Monday (or keep today if it's Monday)
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Set to Monday of current week
    this.weekStartDate = new Date(today);
    this.weekStartDate.setDate(today.getDate() - daysToSubtract);
    this.weekStartDate.setHours(0, 0, 0, 0);

    // Update month and year based on the week start date
    this.currentMonth = this.weekStartDate.getMonth();
    this.currentYear = this.weekStartDate.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendarDays();
    this.loadEvents();
  }

  // Generate the calendar days for the current week
  generateCalendarDays(): void {
    this.calendarDays = [];

    // Generate weekdays (Monday to Friday) for the current week
    for (let i = 0; i < 5; i++) {
      const date = new Date(this.weekStartDate);
      date.setDate(this.weekStartDate.getDate() + i);

      // Check if the day is in the current month
      const isCurrentMonth = date.getMonth() === this.currentMonth;

      this.calendarDays.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth,
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

  // Navigate to the previous week
  navigateToPreviousWeek(): void {
    // Update weekStartDate to the previous week
    this.weekStartDate.setDate(this.weekStartDate.getDate() - 7);

    // Update month and year based on the week start date
    this.currentMonth = this.weekStartDate.getMonth();
    this.currentYear = this.weekStartDate.getFullYear();

    this.generateCalendarDays();
    this.loadEvents();
  }

  // Navigate to the next week
  navigateToNextWeek(): void {
    // Update weekStartDate to the next week
    this.weekStartDate.setDate(this.weekStartDate.getDate() + 7);

    // Update month and year based on the week start date
    this.currentMonth = this.weekStartDate.getMonth();
    this.currentYear = this.weekStartDate.getFullYear();

    this.generateCalendarDays();
    this.loadEvents();
  }

  // Get the week range label (e.g., "10-14 April 2023")
  getWeekLabel(): string {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Get the end date of the week (Friday)
    const weekEndDate = new Date(this.weekStartDate);
    weekEndDate.setDate(this.weekStartDate.getDate() + 4); // Friday is 4 days after Monday

    // Format the date range
    const startDay = this.weekStartDate.getDate();
    const endDay = weekEndDate.getDate();
    const startMonth = this.weekStartDate.getMonth();
    const endMonth = weekEndDate.getMonth();
    const startYear = this.weekStartDate.getFullYear();
    const endYear = weekEndDate.getFullYear();

    // If the week spans two months
    if (startMonth !== endMonth) {
      return `${startDay} ${monthNames[startMonth]} - ${endDay} ${monthNames[endMonth]} ${endYear}`;
    }

    // If the week spans two years
    if (startYear !== endYear) {
      return `${startDay} ${monthNames[startMonth]} ${startYear} - ${endDay} ${monthNames[endMonth]} ${endYear}`;
    }

    // If the week is within the same month and year
    return `${startDay}-${endDay} ${monthNames[startMonth]} ${startYear}`;
  }

  // Load events for the current week
  loadEvents(): void {
    // In a real application, this data would come from a service
    // For now, we'll use mock data based on the current week

    // Get the end date of the week (Friday)
    const weekEndDate = new Date(this.weekStartDate);
    weekEndDate.setDate(this.weekStartDate.getDate() + 4); // Friday is 4 days after Monday

    // Create events for the current week
    const mockEvents: CalendarEvent[] = [
      {
        id: 1,
        title: 'Gramática Avançada',
        startDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate(), 9, 0), // Monday at 9:00
        endDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate(), 10, 30), // Monday at 10:30
        teacher: 'Prof. Silva',
        color: 'bg-blue-100'
      },
      {
        id: 2,
        title: 'Conversação',
        startDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 1, 14, 0), // Tuesday at 14:00
        endDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 1, 15, 30), // Tuesday at 15:30
        teacher: 'Prof. Santos',
        color: 'bg-green-100'
      },
      {
        id: 3,
        title: 'Listening Comprehension',
        startDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 2, 19, 0), // Wednesday at 19:00
        endDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 2, 20, 30), // Wednesday at 20:30
        teacher: 'Prof. Johnson',
        color: 'bg-purple-100'
      },
      {
        id: 4,
        title: 'Business English',
        startDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 3, 10, 0), // Thursday at 10:00
        endDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 3, 11, 30), // Thursday at 11:30
        teacher: 'Prof. Oliveira',
        color: 'bg-yellow-100'
      },
      {
        id: 5,
        title: 'Preparação para TOEFL',
        startDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 4, 16, 0), // Friday at 16:00
        endDate: new Date(this.weekStartDate.getFullYear(), this.weekStartDate.getMonth(), this.weekStartDate.getDate() + 4, 17, 30), // Friday at 17:30
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

  // Get an array of hours for the time grid
  getHoursArray(): number[] {
    const hours: number[] = [];
    for (let i = this.startHour; i <= this.endHour; i++) {
      hours.push(i);
    }
    return hours;
  }

  // Format hour for display (e.g., "08:00")
  formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  // Check if the current week includes today
  hasToday(): boolean {
    return this.calendarDays.some(day => day.isToday);
  }

  // Get the position of the current time indicator
  getCurrentTimePosition(): number {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Calculate position based on hours and minutes
    return (hours - this.startHour + minutes / 60) * this.hourHeight;
  }

  // Calculate the top position of an event based on its start time
  calculateEventTop(event: CalendarEvent): number {
    const startHour = event.startDate.getHours();
    const startMinutes = event.startDate.getMinutes();

    // Calculate position based on start time
    return (startHour - this.startHour + startMinutes / 60) * this.hourHeight;
  }

  // Calculate the height of an event based on its duration
  calculateEventHeight(event: CalendarEvent): number {
    const startTime = event.startDate.getHours() + event.startDate.getMinutes() / 60;
    const endTime = event.endDate.getHours() + event.endDate.getMinutes() / 60;

    // Calculate height based on duration
    return (endTime - startTime) * this.hourHeight;
  }

  // Get the total height of the schedule grid
  getScheduleHeight(): number {
    return (this.endHour - this.startHour) * this.hourHeight;
  }
}
