import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClubsListComponent } from './pages/clubs-list/clubs-list.component';
import { ClubComponent } from './pages/clubs-list/club/club.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { RegisterComponent } from './pages/register/register.component';
import { StylePreviewComponent } from './pages/style-preview/style-preview.component';

const routes: Routes = [
  { path: 'clubs', component: ClubsListComponent },
  { path: 'clubs/:id', component: ClubComponent },
  { path: 'themes/:id', component: ThemeComponent },
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
