import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/data-models';
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

  register(email:string, password:string) {
    return this.http.post(`${this.api.baseUrl}/user`,
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

  me() {
    return this.http.get(`${this.api.baseUrl}/profile`)
    .toPromise().then(d => {
      // TODO this bullshit is for some reason needed to be able to access the
      //   keys on data, passed from the api
      let data: {[k: string]: any} = {};
      Object.assign(data, d);

      this.api.currentUser = new User(data["email"])
      return this.api.currentUser;
    });
  }

  logout() {
    this.api.removeStoredItem('token');
    // TODO push to login
  }
}
