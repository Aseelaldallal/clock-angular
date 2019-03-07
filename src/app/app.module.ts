import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseUrlInterceptor } from './baseUrl.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClockPageComponent } from './components/main/clock-page/clock-page.component';
import { LogsPageComponent } from './components/main/logs-page/logs-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertComponent } from './components/alert/alert.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    ClockPageComponent,
    LogsPageComponent,
    NotFoundComponent,
    NavbarComponent,
    AlertComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: 'https://us-central1-himama-646fc.cloudfunctions.net' },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
