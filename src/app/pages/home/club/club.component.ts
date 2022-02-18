import { Component, Input } from '@angular/core';
import { IClub, IUser } from '../../../models/data-models';
import { ClubService } from '../../../services/club.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent {
  private _club: IClub;
  @Input()
  set club(club: IClub) {
    this._club = club;
    this.clubService.getMembershipsForClub(this._club.id).subscribe(memberships => this.memberships = memberships);
  }

  get club(): IClub {
    return this._club;
  }

  memberships: IUser[];

  constructor(private clubService: ClubService) {}

}
