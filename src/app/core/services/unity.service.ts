import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Unit} from "../models/Unit";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../dtos/api-response";

@Injectable({
  providedIn: 'root',
})
export class UnityService {
  protected baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  getUnities(): Observable<Unit[]> {
    return this.http.get<ApiResponse<Unit[]>>(this.baseUrl + '/unities').pipe(
      map((r) => r.data as Unit[])
    );
  }
}
