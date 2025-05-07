import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Student} from "../models/Student";
import {ApiResponse} from "../dtos/api-response";
import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {authSelectors} from "../state/auth/auth.selectors";
import {User} from "../models/User";


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  store = inject(Store)
  user: User | null = null;

  protected baseUrl = `${environment.apiUrl}/students`

  constructor(private http: HttpClient) {
    this.store.select(authSelectors.user).subscribe((user) => this.user = user)
  }

  getStudentByEmail(): Observable<Student> {
    return this.http.get<ApiResponse<Student>>(`${this.baseUrl}/by-email/${this.user?.email}`).pipe(
      map((r) => r.data as Student)
    )
  }

  getStudentById(): Observable<Student> {
    return this.http.get<ApiResponse<Student>>(`${this.baseUrl}/by-email/${this.user?.id}`).pipe(
      map((r) => r.data as Student)
    )
  }
}
