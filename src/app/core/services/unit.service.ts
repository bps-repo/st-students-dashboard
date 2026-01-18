import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Unit, UnitStatus} from "../models/Unit";
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
  private baseUrl = `${environment.apiUrl}/students`
  student?: Student

  constructor(private http: HttpClient, private store$: Store) {
    store$.select(StudentSelectors.student).subscribe((student) => student ? this.student = student : null)
  }

  getUnits(): Observable<Unit[]> {
    return this.http.get<ApiResponse<Unit[]>>(this.baseUrl).pipe(
      map((r) => r.data as Unit[])
    );
  }

  getMyCurrentLevelUnits(): Observable<Unit[]> {
    return this.http.get<ApiResponse<Unit[]>>(`${this.baseUrl}/me/current-level-unit-progress`).pipe(
      map((r) => {
        const units = r.data.map((unit) => ({
            ...unit,
            status: unit.isCurrentUnit ? UnitStatus.AVAILABLE : unit.complete ? UnitStatus.COMPLETE : UnitStatus.LOCK
          })).sort((a, b) => Number(a.orderUnit) - Number(b.orderUnit))
        console.log("units ", units);
        return units;
      })
    );
  }
}
