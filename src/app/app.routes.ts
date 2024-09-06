import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
  {
    path:'',
    component:WelcomePageComponent
  },
  {
    path:"courses",
    component:MainContentComponent
  }
];
