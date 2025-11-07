import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LessonMaterial, MaterialRelationResponse } from "../models/LessonMaterial";

@Injectable({
  providedIn: 'root'
})
export class LessonMaterialService {
  private baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get materials for a specific lesson
   * @param lessonId - The ID of the lesson
   * @returns Observable of lesson materials
   */
  getLessonMaterials(lessonId: string): Observable<LessonMaterial[]> {
    return this.http.get<MaterialRelationResponse>(`${this.baseUrl}/material-relations/entity/LESSON/${lessonId}`).pipe(
      map(response => response.data || [])
    );
  }
}
