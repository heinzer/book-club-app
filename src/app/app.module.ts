import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClubComponent } from './pages/home/club/club.component';
import { ThemeComponent } from './pages/club-details/theme/theme.component';
import { ThemeDetailsComponent } from './pages/theme-details/theme-details.component';
import { DeadlineComponent } from './pages/theme-details/deadline/deadline.component';

import { APIHttpInterceptor } from './services/interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ClubDetailsComponent } from './pages/club-details/club-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { StylePreviewComponent } from './pages/style-preview/style-preview.component';
import { SharedModule } from './shared/shared.module';

// import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ClubComponent,
    ThemeComponent,
    HomeComponent,
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
    SharedModule
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
