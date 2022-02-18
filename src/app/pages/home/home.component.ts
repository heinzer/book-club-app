import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IClub } from '../../models/data-models';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clubs: IClub[] = [];

  constructor(public auth: AuthService,
              private api: ApiService,
              private router: Router,
              private clubService: ClubService) {}

  ngOnInit(): void {
    // check that the user is authenticated
    if (!this.api.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.clubService.getClubs().subscribe(clubs => this.clubs = clubs);

    }
  }

}
