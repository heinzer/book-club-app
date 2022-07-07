import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';
import {IClubMembership, IUser, LoginResponse} from '../models/data-models';
import { CurrentSessionService } from '../services/current-session.service';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private session: CurrentSessionService, private userService: UserService) {
    if (this.session.getAuthToken()) {
      this.getCurrentUser();
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.session.baseUrl}/isAuthed`);
  }

  register(firstName: string, email:string, password:string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.session.baseUrl}/register`,
      JSON.stringify({
        "firstName": firstName,
        "email": email,
        "password": password
      })).pipe(tap(response => this.session.saveAuthToken(response.access_token)));
  }

  login(email:string, password:string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.session.baseUrl}/login`,
      JSON.stringify({
        "email": email,
        "password": password
      }))
    .pipe(tap(response => this.session.saveAuthToken(response.access_token)));
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.session.baseUrl}/profile`)
    .pipe(tap(user => this.session.saveCurrentUser(user)));
  }

  getCurrentUserMemberships(): Observable<IClubMembership[]> {
    return this.userService.getMembershipsForCurrentUser()
      .pipe(tap(clubMemberships => this.session.saveCurrentUserMemberships(clubMemberships)))
  }

  logout() {
    this.session.removeStoredItem('token');
    // TODO push to login
  }
}

