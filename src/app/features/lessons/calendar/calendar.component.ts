import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {LessonsActions} from "../../../core/state/lessons/lessons.actions";
import {LessonsEntitySelectors, LessonsSelectors} from "../../../core/state/lessons/lessons.selectors";
import {LessonSchedule} from "../../../core/models/LessonSchedule";
import {Observable, of} from "rxjs";
import {CircularLoaderComponent} from "../../../shared/circular-loader/circular-loader.component";
import {StudentSelectors} from "../../../core/state/student/student.selectors";

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: LessonSchedule[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule, CircularLoaderComponent],
  templateUrl: './calendar.component.html',
  styleUrls: []
})
export class CalendarComponent implements OnInit {

  protected lessons$!: LessonSchedule[];

  isLoading$: Observable<boolean> = of(false)
  isLoadingStudent: boolean = false

  errors$: Observable<any> = of(null)

  // Calendar data
  calendarDays: CalendarDay[] = [];
  weekDayNames: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', "Sábado"];

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
  events: LessonSchedule[] = [];

  constructor(private readonly store$: Store) {
    this.store$.select(LessonsEntitySelectors.selectAllLessons).subscribe((lesson) => {
      this.lessons$ = lesson;
      console.log('Lessons:', this.lessons$);
      // Reload events whenever lessons change
      this.loadEvents();
    })

    this.isLoading$ = store$.select(LessonsSelectors.selectLessonsLoading)

    store$.select(StudentSelectors.loading).subscribe(
      (loading) => {
        this.isLoadingStudent = loading;
      }
    )

    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.initializeWeekStartDate();
  }

  ngOnInit(): void {
    this.store$.dispatch(LessonsActions.loadLessons());
    this.generateCalendarDays();
    this.loadEvents();
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

  // Generate the calendar days for the current week
  generateCalendarDays(): void {
    this.calendarDays = [];

    // Generate weekdays (Monday to Saturday) for the current week
    for (let i = 0; i < 6; i++) {
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

  // Get the week range label (e.g., "10-14 April 2023")
  getWeekLabel(): string {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Get the end date of the week (Saturday)
    const weekEndDate = new Date(this.weekStartDate);
    weekEndDate.setDate(this.weekStartDate.getDate() + 5); // Saturday is 5 days after Monday

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
    if (!this.lessons$ || this.lessons$.length === 0) {
      return;
    }

    // Get the end date of the week (Saturday)
    const weekEndDate = new Date(this.weekStartDate);
    weekEndDate.setDate(this.weekStartDate.getDate() + 5); // Saturday is 5 days after Monday


    // Clear existing events from calendar days
    this.calendarDays.forEach(day => {
      day.events = [];
    });

    // Assign events to calendar days
    this.lessons$.forEach(lesson => {

      const lessonStartDate = new Date(lesson.startTime);
      const lessonEndDate = new Date(lesson.endTime);
      // Reset hours to compare just the dates

      lessonStartDate.setHours(0, 0, 0, 0);
      lessonEndDate.setHours(0, 0, 0, 0);

      // Loop through all days in the calendar
      this.calendarDays.forEach(day => {
        const calendarDate = new Date(day.date);
        calendarDate.setHours(0, 0, 0, 0);

        // If the calendar day is between start and end dates (inclusive), add the event
        if (calendarDate >= lessonStartDate && calendarDate <= lessonEndDate) {
          day.events.push(lesson);
        }
      });
    });
  }

  // Get formatted time for an event (e.g., "09:00 - 10:30")
  getEventTimeString(event: LessonSchedule): string {
    const startHours = event.startTime.getHours().toString().padStart(2, '0');
    const startMinutes = event.startTime.getMinutes().toString().padStart(2, '0');
    const endHours = event.endTime.getHours().toString().padStart(2, '0');
    const endMinutes = event.endTime.getMinutes().toString().padStart(2, '0');

    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
  }

  // Check if an event spans multiple days
  isMultiDayEvent(event: LessonSchedule): boolean {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    // Reset hours to compare just the dates
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return startDate.getTime() !== endDate.getTime();
  }

  // Get events for a specific day
  getEventsForDay(day: CalendarDay): LessonSchedule[] {
    return day.events;
  }

  // Format date as DD/MM
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }

  // Get the first day of an event for a specific calendar day
  isFirstDayOfEvent(day: CalendarDay, event: LessonSchedule): boolean {
    const eventStartDate = new Date(event.startTime);
    eventStartDate.setHours(0, 0, 0, 0);

    const calendarDate = new Date(day.date);
    calendarDate.setHours(0, 0, 0, 0);

    return eventStartDate.getTime() === calendarDate.getTime();
  }

  // Get the last day of an event for a specific calendar day
  isLastDayOfEvent(day: CalendarDay, event: LessonSchedule): boolean {
    const eventEndDate = new Date(event.endTime);
    eventEndDate.setHours(0, 0, 0, 0);

    const calendarDate = new Date(day.date);
    calendarDate.setHours(0, 0, 0, 0);

    return eventEndDate.getTime() === calendarDate.getTime();
  }

  // Calculate how many days an event spans
  getEventDuration(event: LessonSchedule): number {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

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
  calculateEventTop(event: LessonSchedule): number {
    const startHour = event.startTime.getHours();
    const startMinutes = event.startTime.getMinutes();
    // Calculate position based on start time
    return (startHour - this.startHour + startMinutes / 60) * this.hourHeight;
  }

  // Calculate the height of an event based on its duration
  calculateEventHeight(event: LessonSchedule): number {
    const startTime = event.startTime.getHours() + event.startTime.getMinutes() / 60;
    const endTime = event.endTime.getHours() + event.endTime.getMinutes() / 60;

    // Calculate height based on duration
    return (endTime - startTime) * this.hourHeight;
  }

  // Get the total height of the schedule grid
  getScheduleHeight(): number {
    return (this.endHour - this.startHour) * this.hourHeight;
  }
}
