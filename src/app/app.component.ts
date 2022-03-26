import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-club-app';

  constructor(public api: ApiService, public auth: AuthService, private router: Router) {
    console.log('app component');
    const possibleToken = this.api.loadToken();
    if (possibleToken) {
      this.auth.getCurrentUser()
        .pipe(
          mergeMap(() => this.auth.getCurrentUserMemberships())
        )
        .subscribe(
          user => {
            console.log('navigating to clubs for some reason')
            this.router.navigate(['/clubs']);
          },
          err => {
            this.router.navigate(['/login']);
          });
    }
  }
}
