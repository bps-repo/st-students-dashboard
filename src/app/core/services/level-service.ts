import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {map, Observable} from "rxjs";
import {Level} from "../models/Level";
import {ApiResponse} from "../dtos/api-response";
import {Student} from "../models/Student";
import {Store} from "@ngrx/store";
import {StudentSelectors} from "../state/student/student.selectors";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  protected baseUrl = `${environment.apiUrl}/levels`
  student?: Student

  constructor(private http: HttpClient, private store$: Store) {
    store$.select(StudentSelectors.student).subscribe((student) => student ? this.student = student : null)
  }

  getLevelById(): Observable<Level> {
    return this.http.get<ApiResponse<Level>>(`${this.baseUrl}/${this.student?.levelId}`).pipe(
      map((r) => r.data as Level)
    )
  }
}
