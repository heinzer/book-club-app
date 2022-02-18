import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  error: any = "";

  constructor(public auth: AuthService, public api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (this.api.currentUser) {
      this.router.navigate(['/']);
    }
  }

  tryLogin() {
    this.auth.login(this.email, this.password)
    .then(r => {
      this.router.navigate(['/']);
    }).catch(e => {
      this.error = e;
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
