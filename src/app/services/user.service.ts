import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClub, IUser } from '../models/data-models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, private api: ApiService) { }

  getMembershipsForCurrentUser(): Observable<IClub[]> {
      return this.http.get<IClub[]>(`${this.api.baseUrl}/users/${this.api.currentUser?.id}/memberships`);
  }
}
