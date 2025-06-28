import {Component, OnInit, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
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

  // Predefined responses for the chatbot
  private responses = [
    {keywords: ['hello', 'hi', 'hey'], response: 'Hello! How can I help you today?'},
    {keywords: ['course', 'courses'], response: 'We offer various courses. You can check them in the Courses section.'},
    {keywords: ['assignment', 'homework', 'task'], response: 'You can find your assignments in the Lessons section.'},
    {keywords: ['grade', 'marks', 'score'], response: 'Your grades are available in your Profile section.'},
    {
      keywords: ['teacher', 'instructor', 'professor'],
      response: 'You can find information about your teachers in the Teachers section.'
    },
    {keywords: ['event', 'events'], response: 'Check the Events section for upcoming events and activities.'},
    {
      keywords: ['certificate', 'certification'],
      response: 'Your certificates are available in the Certificates section.'
    },
    {
      keywords: ['support', 'help'],
      response: 'For additional support, please visit our Support section or contact our help desk.'
    },
    {keywords: ['video', 'videos'], response: 'You can access video courses in the Video Courses section.'},
    {keywords: ['profile', 'account'], response: 'You can manage your profile settings in the Profile section.'},
    {
      keywords: ['logout', 'sign out'],
      response: 'To logout, click on your profile icon in the top right corner and select Logout.'
    }
  ];

  constructor() {
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
      timestamp: new Date()
    });
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text,
      isUser: false,
      timestamp: new Date()
    });
  }

  private respondToMessage(message: string): void {
    const lowerMessage = message.toLowerCase();

    // Check for matches in predefined responses
    for (const item of this.responses) {
      if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
        this.addBotMessage(item.response);
        return;
      }
    }

    // Default response if no match found
    this.addBotMessage('I\'m not sure how to help with that. Please try asking something else or visit our Support section for more assistance.');
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
