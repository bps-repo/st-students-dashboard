import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

export const routes: Routes = [
  {
    path:'',
    component:WelcomePageComponent
  },
  {
    path:"courses",
    component:MainContentComponent
  },
  {
    path:"profile",
    component:ProfileSettingsComponent
  }
];
