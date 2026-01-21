import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { Employee, EmployeesPagedResponse } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all employees with pagination
   * @param page Page number (default: 0)
   * @param size Page size (default: 15)
   * @param sort Sort criteria (default: 'createdAt,desc')
   * @returns Observable of EmployeesPagedResponse
   */
  getEmployees(page: number = 0, size: number = 15, sort: string = 'createdAt,desc'): Observable<EmployeesPagedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<ApiResponse<EmployeesPagedResponse>>(this.baseUrl, { params }).pipe(
      map(response => response.data)
    );
  }

  /**
   * Get all employees (unpaged)
   * @returns Observable of Employee array
   */
  getAllEmployees(): Observable<Employee[]> {
    return this.getEmployees(0, 1000).pipe(
      map(response => response.content)
    );
  }

  /**
   * Get a single employee by ID
   * @param employeeId The ID of the employee
   * @returns Observable of Employee
   */
  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.http.get<ApiResponse<Employee>>(`${this.baseUrl}/${employeeId}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Get employees by role
   * @param roleName The name of the role to filter by
   * @returns Observable of Employee array
   */
  getEmployeesByRole(roleName: string): Observable<Employee[]> {
    return this.getAllEmployees().pipe(
      map(employees => employees.filter(emp => emp.role.name === roleName))
    );
  }

  /**
   * Get employees by center
   * @param centerId The ID of the center to filter by
   * @returns Observable of Employee array
   */
  getEmployeesByCenter(centerId: string): Observable<Employee[]> {
    return this.getAllEmployees().pipe(
      map(employees => employees.filter(emp => emp.workInfo.centerId === centerId))
    );
  }

  /**
   * Get active employees only
   * @returns Observable of Employee array
   */
  getActiveEmployees(): Observable<Employee[]> {
    return this.getAllEmployees().pipe(
      map(employees => employees.filter(emp =>
        emp.accountStatus === 'ACTIVE' && emp.workInfo.status === 'ACTIVE'
      ))
    );
  }

  /**
   * Get full employee name
   * @param employee The employee object
   * @returns Full name string
   */
  getEmployeeFullName(employee: Employee): string {
    return `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`;
  }
}
