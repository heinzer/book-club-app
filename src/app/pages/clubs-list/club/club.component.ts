import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {combineLatest, forkJoin} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import {IClub, ITheme, IUserMembership, ThemeStatus} from '../../../models/data-models';
import { CurrentSessionService } from '../../../services/current-session.service';
import { ClubService } from '../../../services/club.service';
import { ThemeService } from '../../../services/theme.service';
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
  loading = true;

  constructor(public session: CurrentSessionService,
              private clubService: ClubService,
              private themeService: ThemeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params => this.id = +params['clubId']),
      mergeMap(() => combineLatest(this.clubService.getClub(this.id),
        this.clubService.getMembershipsForClub(this.id),
        this.clubService.getClubThemes(this.id)).pipe(
          tap(([club, memberships, themes]) => {
            this.club = club;
            this.members = memberships;
            this.themes = themes;
            this.openThemes = themes.filter(t => t.status === ThemeStatus.OPEN);
            this.closedThemes = themes.filter(t => t.status === ThemeStatus.CLOSED);
            this.loading = false;
          })
      ))
    ).subscribe();
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
