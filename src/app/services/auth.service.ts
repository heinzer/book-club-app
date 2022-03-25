import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import {IClubMembership, IUser, LoginResponse} from '../models/data-models';
import { ApiService } from './api.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private api: ApiService, private userService: UserService) {
    if (this.api.authToken()) {
      this.getCurrentUser();
    }
  }

  register(firstName: string, email:string, password:string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api.baseUrl}/register`,
      JSON.stringify({
        "firstName": firstName,
        "email": email,
        "password": password
      })).pipe(tap(response => this.api.saveAuthToken(response.access_token)));
  }

  login(email:string, password:string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api.baseUrl}/login`,
      JSON.stringify({
        "email": email,
        "password": password
      }))
    .pipe(tap(response => this.api.saveAuthToken(response.access_token)));
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.api.baseUrl}/profile`)
    .pipe(tap(user => this.api.saveCurrentUser(user)));
  }

  getCurrentUserMemberships(): Observable<IClubMembership[]> {
    return this.userService.getMembershipsForCurrentUser()
      .pipe(tap(clubMemberships => this.api.saveCurrentUserMemberships(clubMemberships)))
  }

  logout() {
    this.api.removeStoredItem('token');
    // TODO push to login
  }
}

