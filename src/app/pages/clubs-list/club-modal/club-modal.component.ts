import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ClubService} from '../../../services/club.service';
import {IClub} from '../../../models/data-models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-club-modal',
  templateUrl: './club-modal.component.html',
  styleUrls: ['./club-modal.component.scss']
})
export class ClubModalComponent {
  @ViewChild(`content`) content;
  @Output() public refreshEvent: EventEmitter<IClub> = new EventEmitter<IClub>();

  clubForm: FormGroup;
  isEdit: boolean = false;
  isLoading: boolean = false;
  ModalResults = ModalResults;

  constructor(private userService: UserService,
              private clubService: ClubService,
              private form: FormBuilder,
              private router: Router,
              private modalService: NgbModal) {
    this.clubForm = this.form.group({
      name: ["", Validators.required],
    });
  }

  editClub(club: IClub): void {
    this.isEdit = true;
    this.clubForm.controls['name'].reset(club.name);

    const clubModal = this.modalService.open(this.content, {});
    clubModal.result.then(result => {
        if (result === ModalResults.DELETE) {
          this.clubService.deleteClub(club.id).subscribe(() => {
            this.router.navigate(['/clubs']);
          });
        } else if (result === ModalResults.SAVE) {
          this.clubService.editClub({id: club.id, name: this.clubForm.value.name})
            .subscribe(club => {
              this.isLoading = false;
              this.refreshEvent.next(club);
            });
        }
      },
      reason => {
        console.log(`Dismissed because of ${reason}`)
      }).catch(e => console.log(e));
  }

  createClub(): void {
    this.isEdit = false;
    const clubModal = this.modalService.open(this.content, {});
    clubModal.result.then(result => {
        if (result === ModalResults.SAVE) {
          this.clubService.createClub({name: this.clubForm.value.name})
            .subscribe(club => {
              this.isLoading = false;
              this.refreshEvent.next(club);
              // todo: grab memberships for current user when we allow the user to add users during creation
            });
        }
      },
      reason => {
        console.log(`Dismissed because of ${reason}`);
      }).catch(e => console.log(e));
  }
}

export enum ModalResults {
  SAVE = 'SAVE',
  CANCEL = 'CANCEL',
  DELETE = 'DELETE'
}
