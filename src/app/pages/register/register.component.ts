import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string = "";
  email: string = "";
  password: string = "";
  hidePassword: boolean = true;
  error: any = "";

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  tryRegister() {
    this.auth.register(this.firstName, this.email, this.password)
      .subscribe(
        response => this.router.navigate(['/']),
        error => this.error = error
      );
  }

  login() {
    this.router.navigate(['/login']);
  }

}
