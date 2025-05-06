import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {ApiResponse} from "../dtos/api-response";
import {UserProfile} from "../dtos/user-profile";


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private readonly apiUrl = environment.apiUrl + "/user-profiles";

  constructor(private http: HttpClient) {
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<ApiResponse<UserProfile>>(this.apiUrl + '/me').pipe(
      map((response) => {
        if (response) {
          console.log("profile ", response);
          return response.data as UserProfile;
        } else {
          throw new Error(response);
        }
      }),
    );
  }

  getUserProfileByUserId(id: string): Observable<UserProfile> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.apiUrl}`).pipe(
      map((response) => {
        if (response) {
          return response.data as UserProfile;
        } else {
          throw new Error(response);
        }
      }),
    );
  }

  updateUserProfile(user: UserProfile): Observable<UserProfile> {
    return this.http.put<ApiResponse<UserProfile>>(`${this.apiUrl}/update`, user).pipe(
      map((response) => {
        if (response) {
          return response.data as UserProfile;
        } else {
          throw new Error(response);
        }
      }),
    );
  }

  getUserProfileById(userId: string): Observable<UserProfile> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.apiUrl}/${userId}`).pipe(
      map((response) => {
        if (response) {
          return response.data as UserProfile;
        } else {
          throw new Error(response);
        }
      }),
    );
  }
}
