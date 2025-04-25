export interface FlashCard {
  color: string;
  title?: string;
  image?: string;
  date?: string;
  time?: string;
  level?: string;
  participants?: number;
  location?: string;
  description?: string;
  organizer?: string;
  status?: 'upcoming' | 'ongoing' | 'past';
  type?: 'workshop' | 'meeting' | 'conversation' | 'lecture' | 'other';
}
