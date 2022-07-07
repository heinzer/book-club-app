import {Component, OnInit, ViewChild} from '@angular/core';
import {IClub, ITheme, IUserMembership} from '../../models/data-models';
import { AuthService } from '../../auth/auth.service';
import { CurrentSessionService } from '../../services/current-session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import {ThemeModalComponent} from '../clubs-list/club/theme-modal/theme-modal.component';
import {ClubService} from '../../services/club.service';
import {ThemePhase} from './deadline/deadline.component';
import { OpenLibraryService } from '../../services/openlibrary.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  @ViewChild(ThemeModalComponent) themeModalComponent: ThemeModalComponent;
  theme: ITheme;
  club: IClub;
  themeId: number;
  clubId: number;
  members: IUserMembership[];
  nominations = [];

  shouldShowNominationSection: boolean = false;
  searchTerms: string = '';
  results: object;

  ThemePhase = ThemePhase;

  constructor(public auth: AuthService,
              public session: CurrentSessionService,
              private router: Router, private route: ActivatedRoute,
              private themeService: ThemeService,
              private clubService: ClubService,
              private openLibraryService: OpenLibraryService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = +params['clubId'];
      this.themeId = +params['id'];
      this.clubService.getClub(this.clubId).subscribe(club => this.club = club);
      this.themeService.getTheme(this.themeId).subscribe(theme => this.theme = theme);
      this.clubService.getMembershipsForClub(this.clubId).subscribe(members => this.members = members);
    });
  }

  refreshWithUpdatedTheme(theme: ITheme): void {
    this.theme = theme;
  }

  loadNominationComponent() {
    this.shouldShowNominationSection = true;
  }

  search() {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('terms:',this.searchTerms)
      // search
      let cleanedSearchTerms = encodeURI(this.searchTerms.replace(' ','+').trim());
      this.openLibraryService.searchForBooks(cleanedSearchTerms)
      .subscribe(results => {
        this.results = results;
        console.log('results:',results)
      });
      // this.results = this.openLibraryService.mockSearchBooks();
    }, 500);
  };

  buildImg(result) {
    return `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`;
  }

  nominateBook(result) {
    let workId = result.key.replace('/works/','');
    this.themeService.nominateBook(this.themeId, this.session.getCurrentUser.id, workId, "trigger warning")
    .subscribe(book => console.log('book:',book));
  }
}
