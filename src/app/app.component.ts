import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { CurrentSessionService } from './services/current-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'book-club-app';

  constructor(public session: CurrentSessionService, private router: Router) {}

  logout() {
    this.session.clearSessionData();
    this.router.navigate(['/login']);
  }
}
