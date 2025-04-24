import {Routes} from '@angular/router';
import {WelcomePageComponent} from './features/welcome-page/welcome-page.component';
import {CoursesComponent} from './features/courses/courses.component';
import {EventsComponent} from './features/events/events.component';
import {CerticatesComponent} from './features/certicates/certicates.component';
import {ProfileComponent} from './features/profile/profile.component';
import {TeachersComponent} from './features/teachers/teachers.component';
import {ChangePasswordComponent} from './features/auth/change-password/change-password.component';
import {SupportComponent} from './features/support/support.component';
import {TestsComponent} from './features/tests/tests.component';
import {MaterialsComponent} from './features/lessons/materials/materials.component';
import {MaterialDetailComponent} from './features/lessons/material-detail/material-detail.component';
import {SchoolScheduleComponent} from "./features/school-schedule/school-schedule.component";
import {LayoutContentComponent} from "./layout/layout-content/layout-content.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ResetPasswordComponent} from "./features/auth/reset-password/reset-password.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutContentComponent,
    children: [
      {
        path: 'home',
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
        component: SchoolScheduleComponent,
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
        path: 'schedules',
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
    ]
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  }
];
