import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {CurrentSessionService} from "../services/current-session.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private session: CurrentSessionService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated()
      .pipe(
        map((response) => {
          if (response) {
            return true;
          }
          // clear data
          this.session.clearSessionData();
          this.router.navigate(['/login']);
          return false;
        }),
        catchError((error) => {
          // clear data
          this.session.clearSessionData();
          this.router.navigate(['/login']);
          return of(false);
        }));
  }
}
