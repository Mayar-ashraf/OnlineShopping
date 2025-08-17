import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation(), withInMemoryScrolling({scrollPositionRestoration:'enabled'})), provideAnimations(), provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      newestOnTop: true,
      closeButton: true,
      toastClass:'ngx-toastr toastr-class'
    })]
  
};

