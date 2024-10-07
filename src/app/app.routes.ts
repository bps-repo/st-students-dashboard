import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { CoursesComponent } from './features/courses/courses.component';

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
];
