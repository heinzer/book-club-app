import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {CurrentSessionService} from '../../services/current-session.service';
import {mergeMap, tap} from 'rxjs/operators';
import {LoginResponse} from '../../models/data-models';
import {UserService} from '../../services/user.service';

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

  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
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

  login() {
    this.router.navigate(['/login']);
  }
}
