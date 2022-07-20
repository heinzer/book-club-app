import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import {CurrentSessionService} from "../../services/current-session.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string = "";
  email: string = "";
  password: string = "";
  error: any = "";
  loading = false;
  showLogin = false

  constructor(public auth: AuthService,
              private router: Router,
              private session: CurrentSessionService) { }

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

  registerUser() {
    this.closeAlert();
    this.loading = true;
    this.auth.register(this.firstName, this.email, this.password)
      .pipe(
        mergeMap(() => this.auth.getCurrentUser()),
        mergeMap(() => this.auth.getCurrentUserMemberships())
      )
      .subscribe(
        response => this.router.navigate(['/clubs']),
        error => {
          this.loading = false
          this.error = error;
          console.log("Error: ", error);
        }
      );
  }

  closeAlert(): void {
    this.error = "";
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
