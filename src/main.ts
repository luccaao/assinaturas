import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from '../src/custom-interceptor';
import { appConfig } from './app/app.config';

const appConfigWithProviders = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ]
};

bootstrapApplication(AppComponent, appConfigWithProviders)
  .catch((err) => console.error(err));
