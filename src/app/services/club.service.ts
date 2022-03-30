import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {IClub, ITheme, IUser, IUserMembership} from '../models/data-models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private readonly clubBaseUrl = `${this.api.baseUrl}/clubs`;
  private readonly clubUrl = (clubId: number) => `${this.clubBaseUrl}/${clubId}`;
  constructor(public http: HttpClient, private api: ApiService) {}

  getClubs(): Observable<IClub[]>{
    return this.http.get<IClub[]>(`${this.clubBaseUrl}`);
  }

  getClub(clubId: number): Observable<IClub>{
    return this.http.get<IClub>(`${this.clubUrl(clubId)}`);
  }

  getClubThemes(clubId: number): Observable<ITheme[]>{
    return this.http.get<ITheme[]>(`${this.clubUrl(clubId)}/themes`);
  }

  getMembershipsForClub(clubId: number): Observable<IUserMembership[]> {
    return this.http.get<IUserMembership[]>(`${this.clubUrl(clubId)}/memberships`);
  }

  getCurrentTheme(clubId: number): Observable<ITheme> {
    return this.http.get<ITheme>(`${this.clubUrl(clubId)}/current-theme`);
  }

  createClub(club: IClub): Observable<IClub> {
    return this.http.post<IClub>(this.clubBaseUrl, { adminId: this.api.currentUser?.id, ...club });
  }

  editClub(club: IClub): Observable<IClub> {
    return this.http.put<IClub>(this.clubUrl(club.id), {...club});
  }

  deleteClub(clubId: number): Observable<void> {
    return this.http.delete<void>(this.clubUrl(clubId));
  }
}
