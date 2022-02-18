import { Injectable } from '@angular/core';
import { IUser, LoginResponse, User } from '../models/data-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = "https://book-club-app-server.herokuapp.com";
  public currentUser?: User;
  private storage;
  private token:string;

  public storageKeys = {
    TOKEN: "token",
    CURRENT_USER: "current user"
  };

  /*
    This service holds important things like the URL and user info, and accessing the local storage.
    It will only ever be imported, it does not import anything else.
    Needed to avoid circular dependencies.
  */
  constructor() {
    this.token = "";
    this.storage = window.localStorage;
  }

  /* Token stuff */
  authToken() {
    return this.token;
  }

  loadToken() {
    let possibleToken = this.getStoredItem(this.storageKeys.TOKEN);
    if (possibleToken) {
      this.token = possibleToken;
    }
    return possibleToken;
  }

  saveSessionInfo(loginResponse: LoginResponse): void {
    const { access_token, ...user } = loginResponse;
    this.saveCurrentUser(user);
    this.saveAuthToken(access_token);
  }

  saveCurrentUser(currentUser: IUser): void {
    this.saveStoredItem(this.storageKeys.CURRENT_USER, JSON.stringify(currentUser));
    this.currentUser = currentUser;
  }

  saveAuthToken(authToken:string) {
    this.saveStoredItem(this.storageKeys.TOKEN, authToken);
    this.token = authToken;
  }

  /* Accessing local storage functions */
  getStoredItem(key:string) {
    return this.storage.getItem(key);
  }

  saveStoredItem(key:string, item:any) {
    return this.storage.setItem(key, item);
  }

  removeStoredItem(key:string) {
    return this.storage.removeItem(key);
  }
}
