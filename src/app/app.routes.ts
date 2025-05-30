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
import {UnitDetailComponent} from "./features/units/unit-detail/unit-detail.component";

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
        data: {breadcrumb: 'Inicio'}
      },
      {
        path: 'lessons',
        component: LessonsComponent,
        data: {breadcrumb: 'Cursos'}
      },
      {
        path: 'lessons/:id',
        component: LessonDetailComponent,
        data: {breadcrumb: 'Detalhe do Curso'}
      },
      {
        path: 'units/:id',
        component: UnitDetailComponent,
        data: {breadcrumb: 'Detalhe da Unidade'}
      },
      {
        path: 'video-lessons',
        component: VideoCoursesComponent,
        data: {breadcrumb: 'Video Cursos'}
      },
      {
        path: 'video-lessons-list',
        component: VideoCourseListComponent,
        data: {breadcrumb: 'Lista de Video Cursos'}
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {breadcrumb: 'Perfil'}
      },
      {
        path: 'teachers',
        component: TeachersComponent,
        data: {breadcrumb: 'Professores'}
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        data: {breadcrumb: 'Calendário'}
      },
      {
        path: 'events',
        component: EventsComponent,
        data: {breadcrumb: 'Eventos'}
      },
      {
        path: 'certificates',
        component: CerticatesComponent,
        data: {breadcrumb: 'Certificados'}
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {breadcrumb: 'Mudar Senha'}
      },
      {
        path: 'support',
        component: SupportComponent,
        data: {breadcrumb: 'Suporte'}
      },
      {
        path: 'lessons/materials',
        component: MaterialsComponent,
        data: {breadcrumb: 'Materiais'}
      },
      {
        path: 'lessons/materials/:id',
        component: MaterialDetailComponent,
        data: {breadcrumb: 'Detalhe do Material'}
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
  },
  {
    path: "**",
    redirectTo: '/home',
  }
];
