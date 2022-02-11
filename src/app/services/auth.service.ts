import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegistrationResponse, User } from '../models/data-models';
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

  register(firstName: string, email:string, password:string): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.api.baseUrl}/register`,
      JSON.stringify({
        "firstName": firstName,
        "email": email,
        "password": password
      }))
      .pipe(tap(response => this.api.saveAuthToken(response.access_token)));
  }

  login(email:string, password:string) {
    return this.http.post(`${this.api.baseUrl}/login`,
      JSON.stringify({
        "email": email,
        "password": password
      }))
    .toPromise().then(d => {
      // TODO this bullshit is for some reason needed to be able to access the
      //   keys on data, passed from the api
      let data: {[k: string]: any} = {};
      Object.assign(data, d);

      this.api.saveAuthToken(data["access_token"]);
      return this.me();
    });
  }

  me(): Promise<User> {
    return this.http.get(`${this.api.baseUrl}/profile`)
    .toPromise().then(d => {
      // TODO this bullshit is for some reason needed to be able to access the
      //   keys on data, passed from the api
      let data: {[k: string]: any} = {};
      Object.assign(data, d);

      this.api.currentUser = new User(data["name"], data["email"], data["password"])
      return this.api.currentUser;
    });
  }

  logout() {
    this.api.removeStoredItem('token');
    // TODO push to login
  }
}

