import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITheme, IUser } from '../models/data-models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(public http: HttpClient, private api: ApiService) {}
  getThemes(clubId: string): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${this.api.baseUrl}/themes/${clubId}`);
  }

  getTheme(themeId: string): Observable<ITheme> {
    return this.http.get<ITheme>(`${this.api.baseUrl}/themes/${themeId}`);
  }

  createTheme(values:any): Observable<ITheme> {
    return this.http.post<ITheme>(`${this.api.baseUrl}/themes`,
      JSON.stringify(values))
      // .pipe(map(response => this.api.saveSessionInfo(response)));
  }
}
