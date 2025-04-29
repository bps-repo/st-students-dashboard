import {mergeApplicationConfig, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {appConfig} from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
