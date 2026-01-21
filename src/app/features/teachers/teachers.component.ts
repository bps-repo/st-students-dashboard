import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/Employee';

@Component({
    selector: 'app-teachers',
    imports: [CommonModule, FormsModule],
    templateUrl: './teachers.component.html',
})
export class TeachersComponent implements OnInit {
  protected teachers: Employee[] = [];
  protected filteredTeachers: Employee[] = [];
  protected isLoading = false;
  protected searchTerm = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  /**
   * Load all teachers (employees with TEACHER role)
   */
  loadTeachers(): void {
    this.isLoading = true;
    this.employeeService.getActiveEmployees().subscribe({
      next: (employees) => {
        // Filter only employees with TEACHER role
        this.teachers = employees.filter(emp => emp.role.name === 'TEACHER');
        this.filteredTeachers = this.teachers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Get employee full name
   */
  getEmployeeFullName(employee: Employee): string {
    return `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`;
  }

  /**
   * Get employee photo URL or default
   */
  getEmployeePhoto(employee: Employee): string {
    return employee.personalInfo.photoUrl || '/user.png';
  }

  /**
   * Search teachers by name
   */
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTeachers = this.teachers;
      return;
    }

    const search = this.searchTerm.toLowerCase().trim();
    this.filteredTeachers = this.teachers.filter(teacher => {
      const fullName = this.getEmployeeFullName(teacher).toLowerCase();
      const role = teacher.role.name.toLowerCase();
      const email = teacher.personalInfo.email.toLowerCase();
      return fullName.includes(search) || role.includes(search) || email.includes(search);
    });
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredTeachers = this.teachers;
  }

  /**
   * Get role description
   */
  getRoleDescription(employee: Employee): string {
    return employee.role.description || employee.role.name;
  }

  /**
   * Check if employee is active
   */
  isActive(employee: Employee): boolean {
    return employee.accountStatus === 'ACTIVE' && employee.workInfo.status === 'ACTIVE';
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
      year: 'numeric'
    });
  }
}
