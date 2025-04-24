import { Routes } from '@angular/router';
import { WelcomePageComponent } from './features/welcome-page/welcome-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { CoursesComponent } from './features/courses/courses.component';
import { LessonsComponent } from './features/lessons/lessons.component';
import { EventsComponent } from './features/events/events.component';
import { CerticatesComponent } from './features/certicates/certicates.component';
import { ProfileComponent } from './features/profile/profile.component';
import { TeachersComponent } from './features/teachers/teachers.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { TimetablesComponent } from './features/timetables/timetables.component';
import { SupportComponent } from './features/support/support.component';
import { TestsComponent } from './features/tests/tests.component';
import { MaterialsComponent } from './features/lessons/materials/materials.component';
import { MaterialDetailComponent } from './features/lessons/material-detail/material-detail.component';
import {SchoolScheduleComponent} from "./features/school-schedule/school-schedule.component";

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
    component: ProfileComponent,
  },
  {
    path: 'teachers',
    component: TeachersComponent,
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
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'timetables',
    component: SchoolScheduleComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: 'tests',
    component: TestsComponent,
  },
  {
    path: 'lessons/materials',
    component: MaterialsComponent,
  },
  {
    path: 'lessons/materials/:id',
    component: MaterialDetailComponent,
  },
];
