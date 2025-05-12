import {Routes} from '@angular/router';
import {LessonsComponent} from './features/courses/lessons.component';
import {EventsComponent} from './features/events/events.component';
import {CerticatesComponent} from './features/certicates/certicates.component';
import {ProfileComponent} from './features/profile/profile.component';
import {TeachersComponent} from './features/teachers/teachers.component';
import {ChangePasswordComponent} from './features/auth/change-password/change-password.component';
import {SupportComponent} from './features/support/support.component';
import {MaterialsComponent} from './features/lessons/materials/materials.component';
import {MaterialDetailComponent} from './features/lessons/material-detail/material-detail.component';
import {LayoutContentComponent} from "./layout/layout-content/layout-content.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ResetPasswordComponent} from "./features/auth/reset-password/reset-password.component";
import {authGuard} from "./core/guards/auth.guard";
import {CalendarComponent} from "./features/lessons/calendar/calendar.component";
import {HomePageComponent} from "./features/home/home-page/home-page.component";
import {VideoCoursesComponent} from "./features/video-course/video-courses.component";
import {VideoCourseListComponent} from "./features/video-course-list/video-course-list.component";
import {LessonDetailComponent} from "./features/lessons/lesson-detail/lesson-detail.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutContentComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'lessons',
        component: LessonsComponent,
      },
      {
        path: 'lessons/:id',
        component: LessonDetailComponent,
      },
      {
        path: 'video-lessons',
        component: VideoCoursesComponent,
      },
      {
        path: 'video-lessons-list',
        component: VideoCourseListComponent,
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
        path: 'calendar',
        component: CalendarComponent,
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
        path: 'support',
        component: SupportComponent,
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
