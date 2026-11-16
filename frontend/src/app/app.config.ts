import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router'; // Added Routes here
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { incidentReducer } from './state/incident.reducer';
import { authReducer } from './state/auth/auth.reducer';
import { IncidentEffects } from './state/incident.effects';
import { AuthEffects } from './state/auth/auth.effects';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig = {
  providers: [

    provideRouter(routes as Routes, withComponentInputBinding()), // Added "as Routes" to fix the build error
    provideStore({
      incidentConfig: incidentReducer,
      authConfig: authReducer
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZonelessChangeDetection(),
    provideEffects(IncidentEffects, AuthEffects)
  ],
};
