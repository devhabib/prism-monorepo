import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { PrismIconRegistry } from '@devynelogic/prism-core';
import * as icons from '@devynelogic/prism-icons';
import { 
  piSearchLine, 
  piFileCopyLine, 
  piArrowUpLine, 
  piMailFill, 
  piAlertFill, 
  piLayoutMasonryFill, 
  piMore2Fill,
  piMoreLine,
  piHome4Line,
  piArrowDownSLine,
  piLockLine,
  piLogoutBoxRLine,
  piArrowLeftSLine,
  piArrowRightSLine,
  piEyeLine,
  piEditLine,
  piDeleteBinLine
} from '@devynelogic/prism-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideAppInitializer(() => {
      const registry = inject(PrismIconRegistry);
      
      // Register critical icons explicitly
      registry.addIcons([
        piSearchLine, 
        piFileCopyLine, 
        piEditLine, 
        piArrowUpLine, 
        piMailFill, 
        piAlertFill, 
        piLayoutMasonryFill, 
        piMore2Fill,
        piMoreLine,
        piHome4Line,
        piArrowDownSLine,
        piLockLine,
        piLogoutBoxRLine,
        piArrowLeftSLine,
        piArrowRightSLine,
        piEyeLine,
        piDeleteBinLine
      ]);

      // Register all icons from bundle
      registry.addIcons(Object.values(icons).filter(icon => icon && typeof icon === 'object' && 'name' in icon));
    })
  ],
};
