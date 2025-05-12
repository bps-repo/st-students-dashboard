import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Student} from "../models/Student";
import {ApiResponse} from "../dtos/api-response";
import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {UserToken} from "../models/userToken";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  store = inject(Store)
  user: UserToken | null = null;

  protected baseUrl = `${environment.apiUrl}/students`

  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = authService.getUserFromToken(authService.getAccessTokenFromStorage()!)
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
