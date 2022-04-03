import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {IClub, ITheme, IUser, IUserMembership, ThemeStatus} from '../../../models/data-models';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { ClubService } from '../../../services/club.service';
import { ThemeService } from '../../../services/theme.service';
import { UserService } from '../../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClubModalComponent} from '../club-modal/club-modal.component';
import {ThemeModalComponent} from './theme-modal/theme-modal.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  @ViewChild(ClubModalComponent) clubModalComponent: ClubModalComponent;
  @ViewChild(ThemeModalComponent) themeModalComponent: ThemeModalComponent;

  id: number;
  club: IClub;
  members: IUserMembership[];
  themes: ITheme[];
  openThemes: ITheme[];
  closedThemes: ITheme[];

  constructor(public api: ApiService,
              private clubService: ClubService,
              private themeService: ThemeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    // check that the user is authenticated
    if (!this.api.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.id = +params['clubId']
        this.clubService.getClub(this.id).subscribe(club => this.club = club);
        this.clubService.getMembershipsForClub(this.id).subscribe(members => this.members = members);
        this.fetchThemes();
      })
    }
  }

  fetchThemes() {
    this.clubService.getClubThemes(this.id).subscribe(themes => {
      this.themes = themes;
      this.openThemes = themes.filter(t => t.status === ThemeStatus.OPEN);
      this.closedThemes = themes.filter(t => t.status === ThemeStatus.CLOSED);
    });
  }

  refreshWithUpdatedClub(club: IClub): void {
    this.club = club;
    // todo: get memberships for club once we allow membership edits
  }

  refreshWithNewTheme(theme: ITheme): void {
    this.themeService.getTheme(theme.id).subscribe(theme => {
      this.themes.push(theme);
      this.openThemes.push(theme);
    });
  }
}
