import {provideAnimations} from "@angular/platform-browser/animations";
import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authFeature} from "./core/state/auth/auth.reducer";
import {AuthEffects} from "./core/state/auth/auth.effects";
import {unitsFeature} from "./core/state/units/unitsFeature";
import {UnitsEffects} from "./core/state/units/units.effects";
import {userProfileFeature} from "./core/state/user-profile/user-profile.reducers";
import {UserProfileEffects} from "./core/state/user-profile/user-profile.effects";
import {tokenInterceptor} from "./core/interceptors/token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),

    // NGRX
    provideStore({
      router: routerReducer,
    }),
    provideState(authFeature),
    provideState(unitsFeature),
    provideState(userProfileFeature),
    provideEffects([AuthEffects, UnitsEffects, UserProfileEffects]),
    provideStoreDevtools({
      maxAge: 100,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideRouterStore(),
  ]
};
