import { Injectable } from '@angular/core';
import {IClubMembership, IUser} from '../models/data-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = "https://book-club-app-server.herokuapp.com";
  public currentUser?: IUser;
  public currentUserMemberships: IClubMembership[] = [];
  private storage;
  private token:string;

  public storageKeys = {
    TOKEN: "token",
    CURRENT_USER: "current user",
    CURRENT_USER_MEMBERSHIPS: "current user memberships"
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

  saveCurrentUser(currentUser: IUser): void {
    this.saveStoredItem(this.storageKeys.CURRENT_USER, JSON.stringify(currentUser));
    this.currentUser = currentUser;
  }

  saveCurrentUserMemberships(currentUserMemberships: IClubMembership[]): void {
    this.saveStoredItem(this.storageKeys.CURRENT_USER_MEMBERSHIPS, JSON.stringify(currentUserMemberships));
    this.currentUserMemberships = currentUserMemberships
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
