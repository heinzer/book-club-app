import { Injectable } from '@angular/core';
import {IClubMembership, IUser} from '../models/data-models';

@Injectable({
  providedIn: 'root'
})
export class CurrentSessionService {
  public baseUrl = "https://book-club-app-server.herokuapp.com";
  private currentUser?: IUser;
  private currentUserMemberships: IClubMembership[] = [];
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
  getAuthToken() {
    if (this.token) { // token has already been loaded
      return this.token;
    }

    let possibleToken = this.getStoredItem(this.storageKeys.TOKEN);
    if (possibleToken) {
      this.token = possibleToken;
    }
    return possibleToken;
  }

  saveAuthToken(authToken :string) {
    console.log(authToken)
    this.saveStoredItem(this.storageKeys.TOKEN, authToken);
    this.token = authToken;
  }

  saveCurrentUser(currentUser: IUser): void {
    this.saveStoredItem(this.storageKeys.CURRENT_USER, JSON.stringify(currentUser));
    this.currentUser = currentUser;
  }

  get getCurrentUser(): IUser {
    if (this.currentUser) {
      return this.currentUser
    }

    const possibleUser = this.getStoredItem(this.storageKeys.CURRENT_USER)
    if (possibleUser) {
      this.currentUser = JSON.parse(possibleUser)
      return this.currentUser
    }

    // check the API
    return this.currentUser
  }

  saveCurrentUserMemberships(currentUserMemberships: IClubMembership[]): void {
    this.saveStoredItem(this.storageKeys.CURRENT_USER_MEMBERSHIPS, JSON.stringify(currentUserMemberships));
    this.currentUserMemberships = currentUserMemberships
  }

  isCurrentUserAdminOfClub(clubId: number): boolean {
    return this.currentUserMemberships.find(clubMembership => clubMembership.id === clubId)?.isAdmin;
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
