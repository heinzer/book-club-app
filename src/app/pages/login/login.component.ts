import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CurrentSessionService} from '../../services/current-session.service';
import {Router} from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  error: any = "";
  loading = false;
  showLogin = false

  constructor(public auth: AuthService, public session: CurrentSessionService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.session.getAuthToken()) { // check that token is still valid
      this.auth.isAuthenticated().subscribe(isAuthed => {
        if (isAuthed) {
          this.router.navigate(['/clubs']);
        }
      })
    } else {
      this.showLogin = true
    }
  }

  tryLogin() {
    this.closeAlert();
    this.loading = true;
    this.auth.login(this.email, this.password)
      .pipe(
        mergeMap(() => this.auth.getCurrentUser()),
        mergeMap(() => this.auth.getCurrentUserMemberships())
      )
      .subscribe(r => {
          this.router.navigate(['/clubs']);
        },
        error => {
          this.loading = false;
          this.error = error;
          console.log("Error: ", error);
        });
  }

  closeAlert(): void {
    this.error = "";
  }

  register() {
    this.router.navigate(['/register']);
  }
}
