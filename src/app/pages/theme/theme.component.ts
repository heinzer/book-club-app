import {Component, OnInit, ViewChild} from '@angular/core';
import { ITheme } from '../../models/data-models';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import {ThemeModalComponent} from '../clubs-list/club/theme-modal/theme-modal.component';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  @ViewChild(ThemeModalComponent) themeModalComponent: ThemeModalComponent;
  theme: ITheme;
  clubId: number;

  constructor(public auth: AuthService,
              public api: ApiService,
              private router: Router, private route: ActivatedRoute,
              private themeService: ThemeService) {}

  ngOnInit(): void {
    // check that the user is authenticated
    if (!this.api.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.clubId = +params['clubId'];
        this.themeService.getTheme(this.clubId).subscribe(theme => this.theme = theme);
      });
    }
  }

  refreshWithUpdatedTheme(theme: ITheme): void {

  }
}
