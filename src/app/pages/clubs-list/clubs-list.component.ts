import {Component, OnInit, ViewChild} from '@angular/core';
import { IClub } from '../../models/data-models';
import { AuthService } from '../../auth/auth.service';
import { CurrentSessionService } from '../../services/current-session.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {ClubModalComponent} from './club-modal/club-modal.component';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss']
})
export class ClubsListComponent implements OnInit {
  @ViewChild(ClubModalComponent) clubModalComponent: ClubModalComponent;

  clubs: IClub[] = [];

  constructor(private session: CurrentSessionService,
              private router: Router,
              private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMembershipsForCurrentUser().subscribe(clubs => this.clubs = clubs);
  }

  refreshWithNewClub(club: IClub): void {
    this.clubs.push(club);
  }
}
