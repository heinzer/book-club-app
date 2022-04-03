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
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {faPencil, faPlusCircle, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ClubModalComponent} from './pages/clubs-list/club-modal/club-modal.component';
import {ThemeModalComponent} from './pages/clubs-list/club/theme-modal/theme-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubSummaryComponent,
    ClubsListComponent,
    ClubComponent,
    ClubModalComponent,
    DeadlineComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    StylePreviewComponent,
    ThemeComponent,
    ThemeModalComponent,
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
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIHttpInterceptor,
      multi: true
    },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faPlusCircle, faUsers, faPencil);
  }
}
