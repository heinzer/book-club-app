import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubSummaryComponent } from './pages/clubs-list/club-summary/club-summary.component';
import { ThemeComponent } from './pages/club-details/theme/theme.component';
import { ThemeDetailsComponent } from './pages/theme-details/theme-details.component';
import { DeadlineComponent } from './pages/theme-details/deadline/deadline.component';

import { APIHttpInterceptor } from './services/interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ClubsListComponent } from './pages/clubs-list/clubs-list.component';
import { ClubDetailsComponent } from './pages/club-details/club-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { StylePreviewComponent } from './pages/style-preview/style-preview.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ClubSummaryComponent,
    ThemeComponent,
    ClubsListComponent,
    ClubDetailsComponent,
    ThemeDetailsComponent,
    DeadlineComponent,
    LoginComponent,
    RegisterComponent,
    StylePreviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule
    // AuthService
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
