import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Unit} from '../../features/@types/unit';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../dtos/api-response";

@Injectable({
  providedIn: 'root',
})
export class UnityService {
  protected readonly baseUrl = environment.apiUrl;
  protected readonly apiUrl = `${this.baseUrl}/units`;

  constructor(private http: HttpClient) {
  }


  getUnities(): Observable<Unit[]> {
    const mockUnits: Unit[] = [
      {
        title: 'Unidade 1',
        description: 'Introduction to basics',
        status: 'available',
      },
      {
        title: 'Unidade 2',
        description: 'Fundamental concepts',
        status: 'lock',
      },
      {
        title: 'Unidade 3',
        description: 'Intermediate topics',
        status: 'lock',
      },
      {
        title: 'Unidade 4',
        description: 'Advanced material',
        status: 'lock',
      },
    ];
    return of(mockUnits);
  }
}
