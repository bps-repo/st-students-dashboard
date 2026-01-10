import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {AuthService} from "./auth.service";

export interface ChatRequest {
  message: string;
  conversationId: string;
  temperature?: number;
  maxTokens?: number;
  streaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  user: User
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  model?: string;
  timestamp: string;
}

export interface ChatHistory {
  id: string;
  userMessage: string;
  aiResponse: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  sendMessage(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/message`, request)
  }

  openConversation(title?: String): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.baseUrl}/context?title=${title}`, {})
  }

  getConversationHistory(conversationId: String): Observable<ChatHistory[]> {
    return this.http.get<ChatHistory[]>(`${this.baseUrl}/${conversationId}/history`)
  }

  getConversations(): Observable<Conversation[]> {
    const userId = this.authService.getUserId();
    return this.http.get<Conversation[]>(`${this.baseUrl}/${userId}/conversations`)
  }
}
