import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // check that the user is authenticated
    if (!this.api.currentUser) {
      // this.router.navigate(['/login']);
    } else {

    }
  }

}
