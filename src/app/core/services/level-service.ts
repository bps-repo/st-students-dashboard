import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {map, Observable} from "rxjs";
import {Level} from "../models/Level";
import {ApiResponse} from "../dtos/api-response";

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  protected baseUrl = `${environment.apiUrl}/levels`

  constructor(private http: HttpClient) {}

  getLevelById(): Observable<Level> {
    return this.http.get<ApiResponse<Level>>(`${this.baseUrl}/1`).pipe(
      map((r) => r.data as Level)
    )
  }
}
