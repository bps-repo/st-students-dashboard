import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ApiResponse } from "../dtos/api-response";
import { StudentContract } from "../models/Contract";

@Injectable({ providedIn: 'root' })
export class ContractService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/students`;

  /**
   * Get current student's contracts
   */
  getMyContracts(): Observable<StudentContract[]> {
    return this.http.get<ApiResponse<StudentContract[]>>(`${this.baseUrl}/me/contracts`).pipe(
      map((resp) => {
        if (!resp || resp.data == null) {
          throw new Error('Invalid response from server');
        }
        return resp.data;
      }),
      catchError((error) => {
        const message = error.error?.message || 'Failed to load contracts';
        return throwError(() => new Error(message));
      })
    );
  }
}
