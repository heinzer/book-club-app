import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITheme } from '../models/data-models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeBaseUrl = `${this.api.baseUrl}/themes`;
  private readonly themeUrl = (themeId: number) => `${this.themeBaseUrl}/${themeId}`;

  constructor(public http: HttpClient, private api: ApiService) {}

  getThemes(clubId: number): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${this.themeBaseUrl}/${clubId}`);
  }

  getTheme(themeId: number): Observable<ITheme> {
    return this.http.get<ITheme>(`${this.themeUrl(themeId)}`);
  }

  createTheme(theme: ITheme): Observable<ITheme> {
    return this.http.post<ITheme>(`${this.themeBaseUrl}`, JSON.stringify({...theme}))
  }

  editTheme(theme: ITheme): Observable<ITheme> {
    return this.http.put<ITheme>(this.themeUrl(theme.id), {...theme});
  }

  deleteTheme(id: number): Observable<void> {
    return this.http.delete<void>(this.themeUrl(id));
  }
}
