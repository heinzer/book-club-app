import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  error: any = "";

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  tryLogin() {
    this.auth.login(this.username, this.password)
    .then(r => {
      this.router.navigate(['/']);
    }).catch(e => {
      this.error = e;
    });
  }

}
