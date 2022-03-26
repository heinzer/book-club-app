import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubSummaryComponent } from './pages/clubs-list/club-summary/club-summary.component';
import { ThemeSummaryComponent } from './pages/clubs-list/club/theme-summary/theme-summary.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { DeadlineComponent } from './pages/theme/deadline/deadline.component';

import { APIHttpInterceptor } from './services/interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ClubsListComponent } from './pages/clubs-list/clubs-list.component';
import { ClubComponent } from './pages/clubs-list/club/club.component';
import { RegisterComponent } from './pages/register/register.component';
import { StylePreviewComponent } from './pages/style-preview/style-preview.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './pages/profile/profile.component';

// import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ClubSummaryComponent,
    ClubsListComponent,
    ClubComponent,
    DeadlineComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    StylePreviewComponent,
    ThemeComponent,
    ThemeSummaryComponent
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
