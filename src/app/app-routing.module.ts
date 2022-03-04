import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ClubDetailsComponent } from './pages/club-details/club-details.component';
import { ThemeDetailsComponent } from './pages/theme-details/theme-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { StylePreviewComponent } from './pages/style-preview/style-preview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'club/:id', component: ClubDetailsComponent },
  { path: 'theme/:id', component: ThemeDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stylepreview', component: StylePreviewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
