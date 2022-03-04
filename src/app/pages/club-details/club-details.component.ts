import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IClub, ITheme, IUser } from '../../models/data-models';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss']
})
export class ClubDetailsComponent implements OnInit {
  club: IClub | null = null;
  members: IUser[] | null = null;
  themes: ITheme[] | null = null;
  openThemes: ITheme[] | null = null;
  closedThemes: ITheme[] | null = null;

  constructor(public auth: AuthService,
              private api: ApiService,
              private clubService: ClubService,
              private router: Router, private route: ActivatedRoute,
              private userService: UserService) {}

  ngOnInit(): void {
    // check that the user is authenticated
    if (!this.api.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.clubService.getClub(params['id']).subscribe(club => this.club = club);
        this.clubService.getMembershipsForClub(params['id']).subscribe(members => this.members = members);
        this.clubService.getClubThemes(params['id']).subscribe(themes => {
          this.themes = themes;
          this.openThemes = themes.filter(t => t.status === "OPEN");
          this.closedThemes = themes.filter(t => t.status === "CLOSED");
        });
      })
    }
  }

}
