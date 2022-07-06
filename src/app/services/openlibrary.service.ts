import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentSessionService } from './current-session.service';
import { results } from './mockBooks';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {

  constructor(public http: HttpClient, private api: CurrentSessionService) { }

  // assumes the search terms are already prepared
  searchForBooks(searchTerms): Observable<any[]> {
    let params = "&fields=key,type,title,cover_i,first_publish_year,number_of_pages_median,author_name,subject,&limit=10";
    return this.http.get<any>(`https://openlibrary.org/search.json?q=${searchTerms}${params}`);
  }

  getCover(coverId): Observable<any[]> {
    return this.http.get<any>(`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`);
  }

  mockSearchBooks() {
    return results;
  }
}
