import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import { LoginComponent } from './pages/login/login.component';
import { ClubsListComponent } from './pages/clubs-list/clubs-list.component';
import { ClubComponent } from './pages/clubs-list/club/club.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { RegisterComponent } from './pages/register/register.component';
import { StylePreviewComponent } from './pages/style-preview/style-preview.component';
import {ProfileComponent} from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'clubs',
    component: ClubsListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'clubs/:clubId',
    component: ClubComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'clubs/:clubId/themes/:id',
    component: ThemeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'stylepreview',
    component: StylePreviewComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: 'clubs'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
