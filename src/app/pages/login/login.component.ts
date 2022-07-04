import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

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

  constructor(public auth: AuthService, public api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.api.currentUser) {
      this.router.navigate(['/clubs']);
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
