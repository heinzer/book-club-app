import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { IClub, ITheme, IUser } from '../models/data-models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private readonly clubBaseUrl = `${this.api.baseUrl}/clubs`;
  private readonly clubUrl = (clubId: string) => `${this.clubBaseUrl}/${clubId}`;
  constructor(public http: HttpClient, private api: ApiService) {}

  getClubs(): Observable<IClub[]>{
    return this.http.get<IClub[]>(`${this.clubBaseUrl}`);
  }

  getClub(clubId: string): Observable<IClub>{
    return this.http.get<IClub>(`${this.clubUrl(clubId)}`);
  }

  getClubThemes(clubId: string): Observable<ITheme[]>{
    return this.http.get<ITheme[]>(`${this.clubUrl(clubId)}/themes`);
  }

  getMembershipsForClub(clubId: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.clubUrl(clubId)}/memberships`);
  }

  getCurrentTheme(clubId: string): Observable<ITheme> {
    return this.http.get<ITheme>(`${this.clubUrl(clubId)}/current-theme`);
  }

  createClub(clubName: string): Observable<IClub> {
    return this.http.post<IClub>(this.clubBaseUrl, { adminId: this.api.currentUser?.id, name: clubName });
  }
}
