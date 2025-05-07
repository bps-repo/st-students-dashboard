export interface Lesson {
  id?: string;
  label: string;
  image?: string;
  color?: string;
  title?: string;
  date?: string;
  time?: string;
  level?: string;
  participants?: number;
  location?: string;
  description?: string;
  organizer?: string;
  status?: 'upcoming' | 'ongoing' | 'past' | 'completed' | 'in-progress' | 'not-started';
  type?: 'workshop' | 'meeting' | 'conversation' | 'lecture' | 'practice' | 'quiz' | 'other';
  courseId?: string;
  duration?: number;
  materials?: string[];
  isFavorite?: boolean;
}
