import {Component, OnInit, signal, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ChatService, Conversation, ChatHistory} from '../../core/services/chat.service';
import {MarkdownComponent} from 'ngx-markdown';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownComponent],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatBotComponent implements OnInit {
  private chatService = inject(ChatService);

  conversations = signal<Conversation[]>([]);
  selectedConversation = signal<Conversation | null>(null);
  messages = signal<ChatMessage[]>([]);
  userMessage = '';
  isTyping = false;
  isLoading = signal(false);
  isSidebarOpen = signal(true);


  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    this.isLoading.set(true);

    this.chatService.getConversations().subscribe({
      next: (conversations) => {
        this.conversations.set(conversations);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  createNewChat(): void {
    const title = `Novo Chat ${new Date().toLocaleString()}`;

    this.chatService.openConversation(title).subscribe({
      next: (conversation) => {
        this.conversations.update(convs => [conversation, ...convs]);
        this.selectConversation(conversation);
      },
      error: (error) => {
        console.error('Error creating new conversation:', error);
      }
    });
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation.set(conversation);
    this.loadConversationHistory(conversation.id);
  }

  loadConversationHistory(conversationId: string): void {
    this.isLoading.set(true);
    this.messages.set([]);

    this.chatService.getConversationHistory(conversationId).subscribe({
      next: (history: ChatHistory[]) => {
        const chatMessages: ChatMessage[] = [];

        history.forEach(item => {
          // Add user message
          chatMessages.push({
            text: item.userMessage,
            isUser: true,
            timestamp: new Date()
          });

          // Add AI response
          chatMessages.push({
            text: item.aiResponse,
            isUser: false,
            timestamp: new Date()
          });
        });

        this.messages.set(chatMessages);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading conversation history:', error);
        this.isLoading.set(false);
      }
    });
  }

  sendMessage(): void {
    if (this.userMessage.trim() === '' || !this.selectedConversation()) return;

    const userQuery = this.userMessage;
    this.addUserMessage(userQuery);
    this.userMessage = '';

    this.isTyping = true;

    this.chatService.sendMessage({
      message: userQuery,
      conversationId: this.selectedConversation()!.id
    }).subscribe({
      next: (response) => {
        this.isTyping = false;
        this.addBotMessage(response.message);
      },
      error: (error) => {
        this.isTyping = false;
        console.error('Error sending message:', error);
        this.addBotMessage('Desculpe, ocorreu um erro. Por favor, tente novamente mais tarde.');
      }
    });
  }

  private addUserMessage(text: string): void {
    this.messages.update(msgs => [...msgs, {
      text,
      isUser: true,
      timestamp: new Date()
    }]);
  }

  private addBotMessage(text: string): void {
    this.messages.update(msgs => [...msgs, {
      text,
      isUser: false,
      timestamp: new Date()
    }]);
  }

  deleteConversation(conversationId: string, event: Event): void {
    event.stopPropagation();

    if (confirm('Tens a certeza que queres eliminar essa conversa?')) {
      this.chatService.deleteConversationHistory(conversationId)
      this.conversations.update(convs =>
        convs.filter(conv => conv.id !== conversationId)
      );

      if (this.selectedConversation()?.id === conversationId) {
        this.selectedConversation.set(null);
        this.messages.set([]);
      }
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(open => !open);
  }

  getConversationPreview(conversation: Conversation): string {
    return conversation.title || 'Nova Conversa';
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;

    return new Date(date).toLocaleDateString();
  }
}
