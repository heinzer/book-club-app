import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IClub, ITheme, IUser } from '../../../models/data-models';
import { ClubService } from '../../../services/club.service';
import { ThemeService } from '../../../services/theme.service';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat)

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {
  private _theme: ITheme;
  @Input()
  set theme(theme: ITheme) {
    this._theme = theme;
    // this.clubService.getMembershipsForClub(this._club.id).subscribe(memberships => this.memberships = memberships);
    // this.clubService.getCurrentTheme(this._club.id).subscribe(currentTheme => this.currentTheme = currentTheme);
  }

  get theme(): ITheme {
    return this._theme;
  }

  constructor(private clubService: ClubService, private themeService: ThemeService, private router: Router) {}

  // can probably outsource somewhere, also occurs in club component
  getNextDeadlineForTheme(): string | undefined {
    let now = new Date();

    if (this.theme.status === "CLOSED") {
      return `Discussion took place on ${dayjs(this.theme.discussionDeadline).format('MMMM Do')}`;
    }

    if (new Date(this.theme.nominationDeadline) > now) {
      return `Nominations open until ${dayjs(this.theme.nominationDeadline).format('MMMM Do')}`;
    }

    if (new Date(this.theme.votingDeadline) > now) {
      return `Voting open until ${dayjs(this.theme.votingDeadline).format('MMMM Do')}`;
    }

    if (new Date(this.theme.discussionDeadline) > now) {
      return `Discussion on ${dayjs(this.theme.discussionDeadline).format('MMMM Do')}`;
    }
    return ''; // we shouldn't get here
  }

  viewTheme(id: string) {
    this.router.navigate([`/theme/${id}`]);
  }
}
