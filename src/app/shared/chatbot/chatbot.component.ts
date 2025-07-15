import {Component, OnInit, HostListener, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatService, ChatRequest, ChatResponse, AssistantMessage} from '../../core/services/chat.service';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  conversationId?: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  justToggled = false;
  isOpen = signal(false);
  userMessage = '';
  messages: ChatMessage[] = [];
  isTyping = false;
  currentConversationId = '';

  // System context for the chatbot
  private systemContext = 'Centers, Units, Students, Classes and lessons';

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.addBotMessage('Hi there! I\'m your virtual assistant. How can I help you today?');
  }

  toggleChat(): void {
    this.justToggled = true;
    this.isOpen.update(prev => !prev);

    // To Allow DOM to register the open state
    setTimeout(() => {
      this.justToggled = false;
    }, 200);
  }

  sendMessage(): void {
    if (this.userMessage.trim() === '') return;

    // Add user message
    this.addUserMessage(this.userMessage);
    const userQuery = this.userMessage;
    this.userMessage = '';

    // Simulate bot typing
    this.isTyping = true;
    setTimeout(() => {
      this.respondToMessage(userQuery);
    }, 1000);
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      text,
      isUser: true,
      timestamp: new Date(),
      conversationId: this.currentConversationId
    });
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text,
      isUser: false,
      timestamp: new Date(),
      conversationId: this.currentConversationId
    });
  }

  private respondToMessage(message: string): void {
    // Create chat request
    const chatRequest: ChatRequest = {
      message: message,
      systemContext: this.systemContext,
      conversationId: this.currentConversationId || this.generateConversationId(),
      temperature: 0.2,
      maxTokens: 50,
      streaming: false
    };

    // Call the chat service
    this.chatService.sendMessage(chatRequest).subscribe({
      next: (response: ChatResponse) => {
        this.isTyping = false;
        console.log("Chat response", response);
        // Update conversation ID if it's a new conversation
        if (!this.currentConversationId) {
          this.currentConversationId = response.conversationId;
        }

        // Add bot response to messages
        this.addBotMessage(response.message);
      },
      error: (error) => {
        this.isTyping = false;
        console.error('Error sending message to chat API:', error);
        this.addBotMessage('Sorry, I encountered an error. Please try again later.');
      }
    });
  }

  private generateConversationId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.justToggled) return;
    const chatbotElement = document.querySelector('.chatbot-container');
    const target = event.target as HTMLElement;
    if (chatbotElement && !chatbotElement.contains(target) &&
      !target.classList.contains('chatbot-toggle') &&
      this.isOpen()) {
      this.isOpen.set(false);
    }
  }
}
