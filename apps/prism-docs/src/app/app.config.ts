import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { APP_INITIALIZER } from '@angular/core';
import { PrismIconRegistry } from '@devynelogic/prism-core';
import * as icons from '@devynelogic/prism-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: (registry: PrismIconRegistry) => () => {
        registry.addIcons(Object.values(icons));
      },
      deps: [PrismIconRegistry],
      multi: true
    }
  ],
};
