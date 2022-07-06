import { Component } from '@angular/core';
import { CurrentSessionService } from './services/current-session.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-club-app';

  constructor(public session: CurrentSessionService, public auth: AuthService) {
    const possibleToken = this.session.getAuthToken();
    if (possibleToken) {
      this.auth.getCurrentUser()
        .pipe(
          mergeMap(() => this.auth.getCurrentUserMemberships())
        )
        .subscribe();
    }
  }
}
