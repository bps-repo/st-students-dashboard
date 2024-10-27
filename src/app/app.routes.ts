import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { CoursesComponent } from './features/courses/courses.component';
import { LessonsComponent } from './features/lessons/lessons.component';
import { EventsComponent } from './features/events/events.component';
import { CerticatesComponent } from './features/certicates/certicates.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'profile',
    component: ProfileSettingsComponent,
  },
  {
    path: 'lessons',
    component: LessonsComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'certificates',
    component: CerticatesComponent,
  },
];
