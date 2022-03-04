import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IClub, ITheme, IUser } from '../../../models/data-models';
import { ClubService } from '../../../services/club.service';
import { ThemeService } from '../../../services/theme.service';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat)

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent {
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

  getNextDeadlineForClub(): string | undefined {
    let now = new Date();

    if (new Date(this.currentTheme.nominationDeadline) > now) {
      return `nominations open until ${dayjs(this.currentTheme.nominationDeadline).format('MMMM Do')}`;
    }

    if (new Date(this.currentTheme.votingDeadline) > now) {
      return `voting open until ${dayjs(this.currentTheme.votingDeadline).format('MMMM Do')}`;
    }

    if (new Date(this.currentTheme.discussionDeadline) > now) {
      return `discussion on ${dayjs(this.currentTheme.discussionDeadline).format('MMMM Do')}`;
    }
    return ''; // we shouldn't get here
  }

  viewClubPage(id: string) {
    this.router.navigate([`/club/${id}`]);
  }
}
