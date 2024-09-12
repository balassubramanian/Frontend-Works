import { bootstrapApplication } from '@angular/platform-browser';
import { MainComponent } from './app/main/main.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(MainComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));
