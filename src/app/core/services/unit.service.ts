import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Unit} from "../models/Unit";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../dtos/api-response";
import {Store} from "@ngrx/store";
import {Student} from "../models/Student";
import {StudentSelectors} from "../state/student/student.selectors";

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private baseUrl = `${environment.apiUrl}/units`
  student?: Student

  constructor(private http: HttpClient, private store$: Store) {
    store$.select(StudentSelectors.student).subscribe((student) => student ? this.student = student : null)
  }

  getUnits(): Observable<Unit[]> {
    return this.http.get<ApiResponse<Unit[]>>(this.baseUrl).pipe(
      map((r) => r.data as Unit[])
    );
  }

  getUnitsByLevelId(): Observable<Unit[]> {
    return this.http.get<ApiResponse<Unit[]>>(`${this.baseUrl}/by-level/${this.student?.levelId}`).pipe(
      map((r) => r.data as Unit[])
    );
  }
}
