import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LessonsActions } from '../../../core/state/lessons/lessons.actions';
import { LessonsSelectors } from '../../../core/state/lessons/lessons.selectors';
import { LessonSchedule, LessonScheduleStatus } from '../../../core/models/LessonSchedule';
import { CircularLoaderComponent } from '../../../shared/circular-loader/circular-loader.component';

interface FilterOptions {
  status: LessonScheduleStatus | 'ALL';
  month: string;
  year: number;
}

@Component({
  selector: 'app-lesson-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CircularLoaderComponent],
  templateUrl: './lesson-history.component.html',
  styleUrls: []
})
export class LessonHistoryComponent implements OnInit {

  protected lessons$: LessonSchedule[] = [];
  protected filteredLessons$: LessonSchedule[] = [];

  isLoading$: Observable<boolean> = of(false);

  // Filter options
  protected filterOptions: FilterOptions = {
    status: 'ALL',
    month: '',
    year: new Date().getFullYear()
  };

  // Available filter options
  protected statusOptions = [
    { value: 'ALL', label: 'Todos' },
    { value: LessonScheduleStatus.PRESENT, label: 'Concluídas' },
    { value: LessonScheduleStatus.ABSENT, label: 'Canceladas' },
    { value: LessonScheduleStatus.BOOKED, label: 'Não compareceu' },
  ];

  protected monthOptions = [
    { value: '', label: 'Todos os meses' },
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];

  protected yearOptions: number[] = [];

  // Pagination
  protected currentPage = 1;
  protected itemsPerPage = 10;
  protected totalPages = 1;

  constructor(private readonly store$: Store) {
    this.store$.select(LessonsSelectors.selectHistoryLessons).subscribe((lessons) => {
      this.lessons$ = lessons;
      this.filterLessons();
    });

    this.isLoading$ = this.store$.select(LessonsSelectors.selectHistoryLoading);

    // Generate year options (current year and 2 years back)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.yearOptions.push(currentYear - i);
    }
  }

  ngOnInit(): void {
    this.loadLessonHistory();
  }

  // Load lesson history with current filters
  loadLessonHistory(): void {
    const startDate = this.getStartDateForFilter();
    const endDate = this.getEndDateForFilter();

    this.store$.dispatch(LessonsActions.loadLessonHistory({
      status: this.filterOptions.status !== 'ALL' ? this.filterOptions.status : undefined,
      startDate,
      endDate
    }));
  }

  // Get start date for the current filter
  private getStartDateForFilter(): string | undefined {
    if (!this.filterOptions.month || !this.filterOptions.year) {
      return undefined;
    }

    const year = this.filterOptions.year;
    const month = this.filterOptions.month;
    return `${year}-${month}-01`;
  }

  // Get end date for the current filter
  private getEndDateForFilter(): string | undefined {
    if (!this.filterOptions.month || !this.filterOptions.year) {
      return undefined;
    }

    const year = this.filterOptions.year;
    const month = this.filterOptions.month;
    const lastDay = new Date(year, parseInt(month), 0).getDate();
    return `${year}-${month}-${lastDay}`;
  }

  // Filter lessons based on current filter options
  filterLessons(): void {
    if (!this.lessons$ || this.lessons$.length === 0) {
      this.filteredLessons$ = [];
      this.updatePagination();
      return;
    }

    // Since we're getting filtered data from the API, we just need to sort and paginate
    let filtered = [...this.lessons$];

    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    this.filteredLessons$ = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  // Update pagination based on filtered results
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLessons$.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  // Get lessons for current page
  getPaginatedLessons(): LessonSchedule[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredLessons$.slice(startIndex, endIndex);
  }

  // Change page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Get page numbers for pagination
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Apply filters
  applyFilters(): void {
    this.loadLessonHistory();
  }

  // Reset filters
  resetFilters(): void {
    this.filterOptions = {
      status: 'ALL',
      month: '',
      year: new Date().getFullYear()
    };
    this.loadLessonHistory();
  }

  // Format date for display
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Format time for display
  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get status label in Portuguese
  getStatusLabel(status: LessonScheduleStatus): string {
    const statusLabels: { [key in LessonScheduleStatus]: string } = {
      [LessonScheduleStatus.PRESENT]: 'Pendente',
      [LessonScheduleStatus.ABSENT]: 'Cancelada',
      [LessonScheduleStatus.BOOKED]: 'Reservada',
    };
    return statusLabels[status] || status;
  }

  // Get status color class
  getStatusColorClass(status: LessonScheduleStatus): string {
    const statusColors: { [key in LessonScheduleStatus]: string } = {
      [LessonScheduleStatus.PRESENT]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      [LessonScheduleStatus.ABSENT]: 'bg-blue-100 text-blue-800 border-blue-300',
      [LessonScheduleStatus.BOOKED]: 'bg-red-100 text-red-800 border-red-300',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  }

  // Get total count for current filters
  getTotalCount(): number {
    return this.filteredLessons$.length;
  }
}
