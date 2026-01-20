# Events Feature Implementation

## Overview
Complete implementation of the events feature with pagination support and NgRx state management, matching the API specification:
- **Endpoint**: `{{baseUrl}}/events?page=0&size=1` [GET]
- **Response**: Paginated list of events with participation tracking

## Files Created

### 1. Core Models
**Location**: `src/app/core/models/Event.ts`

```typescript
export enum EventType {
  WORKSHOP, SEMINAR, CONFERENCE, MEETING, 
  TALK, TOUR, TRAINING, OTHER
}

export interface Event {
  id: string;
  title: string;
  online: boolean;
  onlineLink: string | null;
  location: string | null;
  maxCapacity: number;
  description: string;
  type: EventType;
  startAt: string; // ISO date-time
  endAt: string; // ISO date-time
  participations: EventParticipation[];
}

export interface EventsPage {
  content: Event[];
  pageable: {...};
  totalElements: number;
  totalPages: number;
  // ... pagination info
}
```

### 2. Service
**Location**: `src/app/core/services/event.service.ts`

#### Methods:
- `getEvents(page, size)` - Get paginated events
- `getEventById(eventId)` - Get specific event
- `registerForEvent(eventId, studentId)` - Register student for event (POST)
- `cancelRegistration(eventId, studentId)` - Cancel registration (DELETE)
- `getUpcomingEvents(page, size)` - Get future events only

#### API Endpoints:
- **GET** `/events?page=0&size=10` - Get paginated events
- **GET** `/events/:eventId` - Get specific event
- **POST** `/events/:eventId/students/:studentId/participations` - Register for event
- **DELETE** `/events/:eventId/students/:studentId/participations` - Cancel registration

### 3. State Management (NgRx)

#### Files:
- `events.state.ts` - State interface with pagination support
- `events.actions.ts` - Actions for CRUD operations
- `events.feature.ts` - Reducer with all state transitions
- `events.effects.ts` - Side effects for API calls and auto-reload
- `events.selectors.ts` - 14+ selectors including filtered views

#### Registered in: `app.state.ts`
- ✅ Added to `ngrxFeatures` array
- ✅ Added to `ngrxEffects` array

## Usage Example

### In a Component

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Event } from '@core/models/Event';
import { EventsActions } from '@core/state/events/events.actions';
import { EventsSelectors } from '@core/state/events/events.selectors';

@Component({
  selector: 'app-events',
  template: `
    <div *ngIf="loading$ | async">Loading events...</div>
    
    <div *ngFor="let event of events$ | async" class="event-card">
      <h3>{{ event.title }}</h3>
      <p>{{ event.description }}</p>
      <span *ngIf="event.online">🌐 Online</span>
      <span *ngIf="!event.online">📍 {{ event.location }}</span>
      <button (click)="register(event.id)">Register</button>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <span>Page {{ (currentPage$ | async) + 1 }} of {{ totalPages$ | async }}</span>
      <button (click)="loadPage(page - 1)">Previous</button>
      <button (click)="loadPage(page + 1)">Next</button>
    </div>
  `
})
export class EventsComponent implements OnInit {
  events$: Observable<Event[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  totalElements$: Observable<number>;

  constructor(private store: Store) {
    this.events$ = this.store.select(EventsSelectors.events);
    this.loading$ = this.store.select(EventsSelectors.loading);
    this.error$ = this.store.select(EventsSelectors.error);
    this.currentPage$ = this.store.select(EventsSelectors.currentPage);
    this.totalPages$ = this.store.select(EventsSelectors.totalPages);
    this.totalElements$ = this.store.select(EventsSelectors.totalElements);
  }

  ngOnInit(): void {
    // Load first page
    this.store.dispatch(EventsActions.loadEvents({ page: 0, size: 10 }));
  }

  loadPage(page: number): void {
    this.store.dispatch(EventsActions.loadEvents({ page, size: 10 }));
  }

  register(eventId: string): void {
    const studentId = 'your-student-id';
    this.store.dispatch(
      EventsActions.registerForEvent({ eventId, studentId })
    );
  }
}
```

### Load Upcoming Events Only

```typescript
ngOnInit(): void {
  // Load only future events
  this.store.dispatch(
    EventsActions.loadUpcomingEvents({ page: 0, size: 10 })
  );
  
  // Or use selector to filter from all events
  this.upcomingEvents$ = this.store.select(EventsSelectors.upcomingEvents);
}
```

## Available Selectors

```typescript
// Basic selectors
EventsSelectors.events              // All events
EventsSelectors.selectedEvent       // Currently selected event
EventsSelectors.loading             // Loading state
EventsSelectors.error               // Error message

// Pagination selectors
EventsSelectors.currentPage         // Current page number
EventsSelectors.pageSize            // Items per page
EventsSelectors.totalElements       // Total number of events
EventsSelectors.totalPages          // Total number of pages

// Count selectors
EventsSelectors.hasEvents           // Boolean: has any events
EventsSelectors.eventsCount         // Number of events in current page

// Filtered selectors
EventsSelectors.upcomingEvents      // Events in the future
EventsSelectors.pastEvents          // Events that have ended
EventsSelectors.onlineEvents        // Online events only
EventsSelectors.inPersonEvents      // In-person events only
```

## Available Actions

```typescript
// Load events
EventsActions.loadEvents({ page: 0, size: 10 })
EventsActions.loadUpcomingEvents({ page: 0, size: 10 })

// Load specific event
EventsActions.loadEventById({ eventId })

// Select event
EventsActions.selectEvent({ event })
EventsActions.clearSelectedEvent()

// Register for event
EventsActions.registerForEvent({ eventId, studentId })

// Cancel registration
EventsActions.cancelRegistration({ eventId, studentId })

// Pagination
EventsActions.setPage({ page: 1 })
EventsActions.setPageSize({ size: 20 })

// Clear state
EventsActions.clearError()
EventsActions.clearEvents()
```

## Event Types

```typescript
enum EventType {
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  CONFERENCE = 'CONFERENCE',
  MEETING = 'MEETING',
  TALK = 'TALK',
  TOUR = 'TOUR',
  TRAINING = 'TRAINING',
  OTHER = 'OTHER'
}
```

## Pagination Response

The API returns a standard Spring Data page object:

```json
{
  "content": [...],  // Array of events
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    ...
  },
  "totalElements": 50,
  "totalPages": 5,
  "first": true,
  "last": false,
  ...
}
```

## Features

✅ Full NgRx state management  
✅ Pagination support (Spring Data compatible)  
✅ Event registration and cancellation  
✅ Automatic reload after registration/cancellation  
✅ Filtered selectors (upcoming, past, online, in-person)  
✅ Loading and error states  
✅ Type-safe with TypeScript  
✅ Follows existing app patterns  
✅ Integrated with app state  

## Participation Tracking

Each event includes a `participations` array with:
- `id`: Participation ID
- `eventId`: Event ID
- `studentId`: Student ID
- `attended`: Whether student attended
- `createdAt`, `updatedAt`: Timestamps

Use this to:
- Check if student is registered
- Track attendance
- Display participant count

## Example: Check if Student is Registered

```typescript
isStudentRegistered(event: Event, studentId: string): boolean {
  return event.participations.some(p => p.studentId === studentId);
}

getParticipantCount(event: Event): number {
  return event.participations.length;
}

hasCapacity(event: Event): boolean {
  return event.participations.length < event.maxCapacity;
}
```

## Next Steps

1. Create Events list component with pagination
2. Create Event details modal/page
3. Add registration confirmation dialog
4. Add event calendar view
5. Add event filtering by type
6. Add event search functionality
7. Show upcoming events in home page sidebar
8. Send notifications for upcoming events
