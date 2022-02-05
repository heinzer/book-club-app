import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/data-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = "https://book-club-app-server.herokuapp.com";
  public currentUser?:User;
  private token:string;

  constructor(public http: HttpClient) {
    this.token = "";
  }

  authToken() {
    return this.token;
  }

  saveAuthToken(authToken:string) {
    // TODO save the token in local storage
    this.token = authToken;
  }

  register(email:string, password:string, username:string) {
    return this.http.post(`${this.baseUrl}/user`,
      JSON.stringify({
        "email": email,
        "password": password,
        "username": username
      }))
    .toPromise().then(data => {
      // this.currentUser = User.parseUser(data);
      // this.events.publish('successfulLogin');
      return this.currentUser;
    });
  }

  login(username:string, password:string) {
    return this.http.post(`${this.baseUrl}/auth/login`,
      JSON.stringify({
        "username": username,
        "password": password
      }))
    .toPromise().then(d => {
      // TODO this bullshit is for some reason needed to be able to access the
      //   keys on data, passed from the api
      let data: {[k: string]: any} = {};
      Object.assign(data, d);

      this.token = data["access_token"];
      return this.me();
    });
  }

  me() {
    return this.http.get(`${this.baseUrl}/profile`)
    .toPromise().then(d => {
      // TODO this bullshit is for some reason needed to be able to access the
      //   keys on data, passed from the api
      let data: {[k: string]: any} = {};
      Object.assign(data, d);

      this.currentUser = new User(data["username"], data["email"])
      return this.currentUser;
    });
  }
}
