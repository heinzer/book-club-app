import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {IClub, ITheme, IUser, IUserMembership, ThemeStatus} from '../../models/data-models';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ClubService } from '../../services/club.service';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss']
})
export class ClubDetailsComponent implements OnInit {
  id: string;
  club: IClub;
  members: IUserMembership[];
  themes: ITheme[];
  openThemes: ITheme[];
  closedThemes: ITheme[];
  newThemeForm: FormGroup;

  constructor(private api: ApiService,
              private clubService: ClubService, private themeService: ThemeService,
              private router: Router, private route: ActivatedRoute,
              private userService: UserService, form: FormBuilder) {
    this.newThemeForm = form.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      nominationDeadline: ["", Validators.required],
      votingDeadline: ["", Validators.required],
      discussionDeadline: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    // check that the user is authenticated
    if (!this.api.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.id = params['id']
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

  createTheme() {
    console.log(this.newThemeForm)
    let formFields: ITheme = {
      clubId: this.club?.id,
      nominatorId: this.api.currentUser?.id,
      name: this.newThemeForm.value.name,
      description: this.newThemeForm.value.description,
      status: ThemeStatus.OPEN,
      startDate: new Date().toString(),
      nominationDeadline: new Date(this.newThemeForm.value.nominationDeadline).toString(),
      votingDeadline: new Date(this.newThemeForm.value.votingDeadline).toString(),
      readingDeadline: new Date(this.newThemeForm.value.discussionDeadline).toString(),
      discussionDeadline: new Date(this.newThemeForm.value.discussionDeadline).toString(),
    }
    this.themeService.createTheme(formFields).subscribe(theme => {
      this.fetchThemes();
    }, err => {
      console.log('err:', err)
    });
  }

}
