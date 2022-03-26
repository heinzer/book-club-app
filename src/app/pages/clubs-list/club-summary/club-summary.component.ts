import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IClub, ITheme, IUser } from '../../../models/data-models';
import { ClubService } from '../../../services/club.service';
import { ThemeService } from '../../../services/theme.service';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat)

@Component({
  selector: 'app-club-summary',
  templateUrl: './club-summary.component.html',
  styleUrls: ['./club-summary.component.scss']
})
export class ClubSummaryComponent {
  private _club: IClub;
  @Input()
  set club(club: IClub) {
    this._club = club;
    this.clubService.getMembershipsForClub(this._club.id).subscribe(memberships => this.memberships = memberships);
    this.clubService.getCurrentTheme(this._club.id).subscribe(currentTheme => this.currentTheme = currentTheme);
  }

  get club(): IClub {
    return this._club;
  }

  memberships: IUser[];
  currentTheme: ITheme;

  constructor(private clubService: ClubService, private themeService: ThemeService, private router: Router) {}

  viewClubPage(id: number) {
    this.router.navigate([`/club/${id}`]);
  }
}
