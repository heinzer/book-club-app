import { HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse, HttpHandler } from '@angular/common/http/';
import { CurrentSessionService } from './current-session.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class APIHttpInterceptor implements HttpInterceptor {
  constructor(public session: CurrentSessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.session.getAuthToken()}`,
      },
    });

    // todo: if API errors out because the token is bad > redirect to login page

    return next.handle(req);
  }
}
