import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http/';
import { HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class APIHttpInterceptor implements HttpInterceptor {
  constructor(public events: Events, public auth: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let newReq;
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization', `Bearer ${this.auth.authToken()}`
      )
    });

    return next.handle(newReq).pipe(debounceTime(30000)).map((event: HttpResponse<any>) => {
      if (event.headers) {
        let authToken = event.headers.get('Authorization');
        if (authToken) {
          this.auth.saveAuthToken(authToken);
        }
      }
      return event;
    }).catch((err: any, caught) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:   // Unauthorized, kick to login
            // this.events.publish('badAuthToken');
            return Observable.throw(err);

          case 500:
            return Observable.throw(err);

          default:
            return Observable.throw(err);
        }
      }
    });
  }
}
