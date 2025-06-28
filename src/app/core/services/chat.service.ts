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

export interface AssistantMessage {
  messageType: string;
  toolCalls: any[];
  textContent: string;
  reasoningContent: any;
  prefix: any;
  metadata: {
    finishReason: string;
    index: number;
    id: string;
    role: string;
    messageType: string;
  };
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  assistantMessage?: AssistantMessage;
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
      map((response) => {
        console.log("response ", response);
        return {
          message: response.response,
          conversationId: response.conversationId,
          assistantMessage: response.assistantMessage
        }
      })
    )
  }
}
