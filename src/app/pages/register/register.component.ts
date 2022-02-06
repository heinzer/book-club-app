import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";
  hidePassword: boolean = true;
  error: any = "";

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleHide() {
    this.hidePassword = !this.hidePassword;
  }

  tryRegister() {
    this.auth.register(this.email, this.password)
    .then(r => {
      this.router.navigate(['/']);
    }).catch(e => {
      this.error = e;
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
