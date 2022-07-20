import {Component, OnInit, ViewChild} from '@angular/core';
import {IClub, IOpenLibraryResponse, ITheme, IUserMembership} from '../../models/data-models';
import { CurrentSessionService } from '../../services/current-session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import {ThemeModalComponent} from '../clubs-list/club/theme-modal/theme-modal.component';
import {ClubService} from '../../services/club.service';
import {ThemePhase} from './deadline/deadline.component';
import { OpenLibraryService } from '../../services/openlibrary.service';

import {interval, Observable, Subject} from 'rxjs';
import {debounce, distinct, switchMap, tap} from 'rxjs/operators';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  @ViewChild(ThemeModalComponent) themeModalComponent: ThemeModalComponent;
  @ViewChild('searchbar') searchbar: ElementRef;
  results$: Observable<IOpenLibraryResponse>;
  searchTerms$ = new Subject<string>();

  theme: ITheme;
  club: IClub;
  themeId: number;
  clubId: number;
  members: IUserMembership[];
  nominations = [];
  shouldShowNominationSection: boolean = false;
  isSearching: boolean = false;

  ThemePhase = ThemePhase;

  constructor(public session: CurrentSessionService,
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

    this.results$ = this.searchTerms$.pipe(
      distinct(),
      debounce(() => interval(500)),
      tap(() => this.isSearching = true),
      switchMap(searchText => this.search(searchText)),
      tap(() => this.isSearching = false)
    )
  }

  refreshWithUpdatedTheme(theme: ITheme): void {
    this.theme = theme;
  }

  loadNominationComponent() {
    this.shouldShowNominationSection = true;
  }

  onSearchTermsChange(event): void {
    this.searchTerms$.next(event.target.value)
  }

  search(searchText: string): Observable<IOpenLibraryResponse> {
    let cleanedSearchTerms = encodeURI(searchText.replace(' ','+').trim());
    return this.openLibraryService.searchForBooks(cleanedSearchTerms)
  };

  exitSearch(): void {
    // todo cancel any api calls
    this.shouldShowNominationSection = false;
  }

  buildImg(result) {
    return `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`;
  }

  nominateBook(result) {
    let workId = result.key.replace('/works/','');
    this.themeService.nominateBook(this.themeId, this.session.getCurrentUser.id, workId, "trigger warning")
    .subscribe(book => console.log('book:',book));
  }
}
