import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import { ITheme, ThemeStatus } from '../../../models/data-models';
import { ClubService } from '../../../services/club.service';
import { ThemeService } from '../../../services/theme.service';

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
  }

  get theme(): ITheme {
    return this._theme;
  }

  constructor(private clubService: ClubService, private themeService: ThemeService, private router: Router) {}

  viewTheme(id: number) {
    this.router.navigate([`/theme/${id}`]);
  }
}
