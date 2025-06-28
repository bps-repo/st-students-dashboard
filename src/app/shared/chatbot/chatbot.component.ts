import {Component, OnInit, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatService, ChatRequest, ChatResponse} from '../../core/services/chat.service';

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
  isOpen = false;
  userMessage = '';
  messages: ChatMessage[] = [];
  isTyping = false;
  currentConversationId = '';

  // System context for the chatbot
  private systemContext = 'Centers, Units, Students, Classes and lessons';

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    // Add initial welcome message
    this.addBotMessage('Hi there! I\'m your virtual assistant. How can I help you today?');
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
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
      this.isTyping = false;
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

    console.log("Message to send: ", message);

    // Call the chat service
    this.chatService.sendMessage(chatRequest).subscribe({
      next: (response: any) => {

        console.log("Chat response", response);
        // Update conversation ID if it's a new conversation
        if (!this.currentConversationId) {
          this.currentConversationId = response.conversationId;
        }

        // Add bot response to messages
        this.addBotMessage(response);
      },
      error: (error) => {
        console.error('Error sending message to chat API:', error);
        this.addBotMessage('Sorry, I encountered an error. Please try again later.');
      }
    });
  }

  private generateConversationId(): string {
    // Generate a simple random ID for new conversations
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Close chat when clicking outside (optional)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const chatbotElement = document.querySelector('.chatbot-container');
    const target = event.target as HTMLElement;

    if (chatbotElement && !chatbotElement.contains(target) &&
      !target.classList.contains('chatbot-toggle') &&
      this.isOpen) {
      this.isOpen = false;
    }
  }
}
