import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../core/models/Student';
import { StudentSelectors } from '../../core/state/student/student.selectors';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../core/dtos/api-response';
import { MarkdownComponent } from 'ngx-markdown';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  senderName?: string;
  senderImage?: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

@Component({
  selector: 'app-vip-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownComponent],
  templateUrl: './vip-chat.component.html',
  styleUrls: ['./vip-chat.component.scss']
})
export class VipChatComponent implements OnInit, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
  
  student$!: Observable<Student | null>;
  student: Student | null = null;
  teacher: Teacher | null = null;
  messages: ChatMessage[] = [];
  userMessage = '';
  isTyping = false;
  currentConversationId = '';
  loading = true;

  constructor(
    private store$: Store<any>,
    private http: HttpClient
  ) {
    this.student$ = this.store$.select(StudentSelectors.student);
  }

  ngOnInit(): void {
    this.student$.subscribe(student => {
      this.student = student;
      if (student?.vip && student?.vipTeacherId) {
        this.loadTeacher(student.vipTeacherId);
        this.loadMessages();
      } else {
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  loadTeacher(teacherId: string): void {
    // Assuming there's an endpoint to get teacher by ID
    // Adjust the endpoint based on your API structure
    this.http.get<ApiResponse<Teacher>>(`${environment.apiUrl}/teachers/${teacherId}`)
      .pipe(
        map(response => response.data)
      )
      .subscribe({
        next: (teacher) => {
          this.teacher = teacher;
          this.loading = false;
          if (this.messages.length === 0) {
            this.addTeacherMessage(`Hello! I'm ${teacher.name}, your VIP teacher. How can I help you today?`);
          }
        },
        error: (error) => {
          console.error('Error loading teacher:', error);
          this.loading = false;
          // Fallback: create a basic teacher object
          this.teacher = {
            id: teacherId,
            name: 'Your Teacher',
            email: '',
            phone: '',
            image: '/user.png'
          };
        }
      });
  }

  loadMessages(): void {
    // Load existing messages from API if available
    // For now, we'll start with an empty array
    // You can implement message loading from your API here
    if (this.student?.vipTeacherId) {
      // Example: Load conversation history
      // this.http.get(`${environment.apiUrl}/chat/vip/${this.student.vipTeacherId}/messages`)
      //   .subscribe(messages => this.messages = messages);
    }
  }

  sendMessage(): void {
    if (this.userMessage.trim() === '' || !this.teacher || !this.student) return;

    this.addUserMessage(this.userMessage);
    const userQuery = this.userMessage;
    this.userMessage = '';

    // Simulate teacher typing
    this.isTyping = true;
    
    // Send message to API
    this.sendMessageToAPI(userQuery);
  }

  private sendMessageToAPI(message: string): void {
    if (!this.student?.vipTeacherId) return;

    const request = {
      message: message,
      teacherId: this.student.vipTeacherId,
      studentId: this.student.id,
      conversationId: this.currentConversationId || this.generateConversationId()
    };

    // Adjust endpoint based on your API structure
    this.http.post<ApiResponse<{ message: string; conversationId: string }>>(
      `${environment.apiUrl}/chat/vip/message`,
      request
    )
      .pipe(
        map(response => response.data)
      )
      .subscribe({
        next: (response) => {
          this.isTyping = false;
          if (!this.currentConversationId) {
            this.currentConversationId = response.conversationId;
          }
          this.addTeacherMessage(response.message);
        },
        error: (error) => {
          this.isTyping = false;
          console.error('Error sending message:', error);
          this.addTeacherMessage('Sorry, I encountered an error. Please try again later.');
        }
      });
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      text,
      isUser: true,
      timestamp: new Date(),
      senderName: this.student?.name || 'You',
      senderImage: '/user.png'
    });
    this.scrollToBottom();
  }

  private addTeacherMessage(text: string): void {
    this.messages.push({
      text,
      isUser: false,
      timestamp: new Date(),
      senderName: this.teacher?.name || 'Teacher',
      senderImage: this.teacher?.image || '/user.png'
    });
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  private generateConversationId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

