import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

  hidePassword: boolean = true;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleHide() {
    this.hidePassword = !this.hidePassword;
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
