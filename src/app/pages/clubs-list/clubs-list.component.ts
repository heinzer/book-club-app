import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClub } from '../../models/data-models';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { UserService } from '../../services/user.service';
import {faCoffee, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss']
})
export class ClubsListComponent implements OnInit {
  clubs: IClub[] = [];
  newClubForm: FormGroup;
  faPlusCircle = faPlusCircle;

  constructor(public auth: AuthService,
              private api: ApiService,
              private router: Router,
              private userService: UserService,
              private clubService: ClubService,
              private form: FormBuilder) {
    this.newClubForm = form.group({
      name: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('home component');
    // check that the user is authenticated
    if (!this.api.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.userService.getMembershipsForCurrentUser().subscribe(clubs => this.clubs = clubs);
    }
  }

  createClub(): void {
    this.clubService.createClub(this.newClubForm.value.name).subscribe(club => {
      this.userService.getMembershipsForCurrentUser().subscribe(clubs => this.clubs = clubs);
    })
  }

}
