import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { IClub } from '../../models/data-models';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clubs: IClub[] = [];
  newClubForm: FormGroup;

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
