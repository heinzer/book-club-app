import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ApiService} from '../../services/api.service';
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

  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.auth.register(this.firstName, this.email, this.password)
      .pipe(
        mergeMap(() => this.auth.getCurrentUser()),
        mergeMap(() => this.auth.getCurrentUserMemberships())
      )
      .subscribe(
        response => this.router.navigate(['/clubs']),
        error => this.error = error
      );
  }

  login() {
    this.router.navigate(['/login']);
  }
}
