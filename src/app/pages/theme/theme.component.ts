import { Component, OnInit } from '@angular/core';
import { ITheme } from '../../models/data-models';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  theme: ITheme;

  constructor(public auth: AuthService,
              private api: ApiService,
              private router: Router, private route: ActivatedRoute,
              private themeService: ThemeService,
              private userService: UserService) {}

  ngOnInit(): void {
    // check that the user is authenticated
    if (!this.api.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.themeService.getTheme(params['id']).subscribe(theme => this.theme = theme);
      });
    }
  }

}
