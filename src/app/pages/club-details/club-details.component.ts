import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { IClub, ITheme, IUser } from '../../models/data-models';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  club: IClub | null = null;
  members: IUser[] | null = null;
  themes: ITheme[] | null = null;
  openThemes: ITheme[] | null = null;
  closedThemes: ITheme[] | null = null;
  newThemeForm: FormGroup;

  constructor(public auth: AuthService,
              private api: ApiService,
              private clubService: ClubService, private themeService: ThemeService,
              private router: Router, private route: ActivatedRoute,
              private userService: UserService, form: FormBuilder) {
                this.newThemeForm = form.group({
                  name: ["", Validators.required],
                  description:["", Validators.required],
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
      this.openThemes = themes.filter(t => t.status === "OPEN");
      this.closedThemes = themes.filter(t => t.status === "CLOSED");
    });
  }

  createTheme() {
    console.log(this.newThemeForm)
    let formFields = {
      clubId: this.club?.id,
      nominatorId: this.api.currentUser?.id,
      name: this.newThemeForm.value.name,
      description: this.newThemeForm.value.description,
      status: 'OPEN',
      startDate: new Date(),
      nominationDeadline: new Date(this.newThemeForm.value.nominationDeadline),
      votingDeadline: new Date(this.newThemeForm.value.votingDeadline),
      readingDeadline: new Date(this.newThemeForm.value.discussionDeadline),
      discussionDeadline: new Date(this.newThemeForm.value.discussionDeadline),
    }
    this.themeService.createTheme(formFields).subscribe(theme => {
      this.fetchThemes();
      // todo close the modal
      console.log('theme:',theme)
    }, err => {
      console.log('err:',err)
    });
  }

}
