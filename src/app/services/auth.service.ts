import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { IUser, LoginResponse, User } from '../models/data-models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private api: ApiService) {
    if (this.api.authToken()) {
      this.me();
    }
  }

  register(firstName: string, email:string, password:string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api.baseUrl}/register`,
      JSON.stringify({
        "firstName": firstName,
        "email": email,
        "password": password
      }))
      .pipe(tap(response => this.api.saveSessionInfo(response)));
  }

  login(email:string, password:string): Observable<User> {
    return this.http.post<LoginResponse>(`${this.api.baseUrl}/login`,
      JSON.stringify({
        "email": email,
        "password": password
      }))
    .pipe(
      tap(response => this.api.saveAuthToken(response.access_token)),
      mergeMap(() => this.me())
    );
  }

  me(): Observable<User> {
    return this.http.get<IUser>(`${this.api.baseUrl}/profile`)
    .pipe(map(user => {
      const u = new User(user.id, user.firstName, user.email, user.password)
      this.api.saveCurrentUser(u);
      console.log('current user is: ', this.api.currentUser);
      return u;
    }));
  }

  logout() {
    this.api.removeStoredItem('token');
    // TODO push to login
  }
}

