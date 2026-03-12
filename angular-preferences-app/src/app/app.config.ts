import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { 
  provideRouter, 
  withInMemoryScrolling, 
  withViewTransitions 
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideSnackbarConfig } from './providers/snackbar.provider';
import { provideModal } from './providers/modal.provider';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(
      routes,
      
      // 1. SCROLL MANAGEMENT: 
      // 'enabled' auto-scrolls to top on new navigations, and restores 
      // exact scroll Y position when the user hits the browser's "Back" button!
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),

      // 2. PAGE TRANSITIONS (Optional but highly recommended):
      // This enables the modern "View Transitions API" to smoothly crossfade pages.
      withViewTransitions({ skipInitialTransition: true })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideModal(),
    provideSnackbarConfig({
      defaultDuration: 5000,
      errorDuration: 8000,
      defaultPlacement: 'top-center',
      icons: {
        success: 'done',
        error: 'cancel',
      },
    }),
  ],
};
