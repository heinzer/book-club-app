import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITheme, IBook, NominateBookRequest } from '../models/data-models';
import { CurrentSessionService } from './current-session.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeBaseUrl = `${this.session.baseUrl}/themes`;
  private readonly themeUrl = (themeId: number) => `${this.themeBaseUrl}/${themeId}`;

  constructor(public http: HttpClient, private session: CurrentSessionService) {}

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

  // Book Stuff
  nominateBook(themeId: number, nominatorId: number, workId: string, triggerWarnings: string): Observable<IBook> {
    return this.http.post<IBook>(`${this.themeBaseUrl}/${themeId}/books`,
      JSON.stringify({
        themeId: themeId,
        nominatorId: nominatorId,
        workId: workId,
        isbn: "isbn",
        triggerWarnings: triggerWarnings
      })
    );
  }
}
