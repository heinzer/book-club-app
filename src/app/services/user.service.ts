import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClubMembership } from '../models/data-models';
import { CurrentSessionService } from './current-session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, private session: CurrentSessionService) { }

  getMembershipsForCurrentUser(): Observable<IClubMembership[]> {
    return this.http.get<IClubMembership[]>(`${this.session.baseUrl}/users/${this.session.getCurrentUser.id}/memberships`);
  }
}
