import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-club-app';

  constructor(public api: ApiService, public auth: AuthService, private router: Router) {
    const possibleToken = this.api.loadToken();
    if (possibleToken) {
      this.auth.me()
      .then(user => {
        // this.router.navigate(['/']);
      }).catch(err => {
        this.router.navigate(['/login']);
      });
    }
  }
}
