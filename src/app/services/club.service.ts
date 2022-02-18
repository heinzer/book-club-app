import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { IClub, IUser } from '../models/data-models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(public http: HttpClient, private api: ApiService) {}

  getClubs(): Observable<IClub[]>{
    return this.http.get<IClub[]>(`${this.api.baseUrl}/clubs`);
  }

  getMembershipsForClub(clubId: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.api.baseUrl}/clubs/${clubId}/memberships`);
  }
}
