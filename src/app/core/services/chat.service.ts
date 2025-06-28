import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ApiResponse} from "../dtos/api-response";

export interface ChatRequest {
  message: string;
  systemContext: string;
  conversationId: string;
  temperature: number;
  maxTokens: number;
  streaming: boolean;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) {
  }

  sendMessage(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<any>(`${this.baseUrl}/message`, request).pipe(
      map((r) => {
        console.log("API RESPONSE: ", r, "")
        return r.response;
      })
    );
  }
}
