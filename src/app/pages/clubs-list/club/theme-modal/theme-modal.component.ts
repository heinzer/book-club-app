import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '../../../../services/theme.service';
import {ITheme, ThemeStatus} from '../../../../models/data-models';
import {CurrentSessionService} from '../../../../services/current-session.service';
import {ClubService} from '../../../../services/club.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent {
  @ViewChild(`content`) content;
  @Output() public refreshEvent: EventEmitter<ITheme> = new EventEmitter<ITheme>();

  themeForm: FormGroup;
  isEdit: boolean = false;
  isLoading: boolean = false;
  ModalResults = ModalResults;
  model: NgbDateStruct;

  constructor(private session: CurrentSessionService,
              private clubService: ClubService,
              private router: Router,
              private route: ActivatedRoute,
              private themeService: ThemeService,
              private form: FormBuilder,
              private modalService: NgbModal) {
    this.themeForm = form.group({
      name: ["", Validators.required],
      description: [""],
      nominationDeadline: ["", Validators.required],
      votingDeadline: ["", Validators.required],
      discussionDeadline: ["", Validators.required]
    });
  }

  editTheme(theme: ITheme): void {
    this.isEdit = true;
    this.themeForm.setValue({
      name: theme.name,
      description: theme.description,
      nominationDeadline: formatDate(theme.nominationDeadline, 'yyyy-MM-dd', 'en'),
      votingDeadline: formatDate(theme.votingDeadline, 'yyyy-MM-dd', 'en'),
      discussionDeadline: formatDate(theme.discussionDeadline, 'yyyy-MM-ddTHH:mm', 'en')
    });

    const clubModal = this.modalService.open(this.content);
    clubModal.result.then(result => {
      if (result === ModalResults.DELETE) {
        this.themeService.deleteTheme(theme.id).subscribe(() => {
          this.router.navigate([`/clubs/${theme.clubId}`]);
        });
      } else if (result === ModalResults.SAVE) {
        this.themeService.editTheme({
          ...theme,
          name: this.themeForm.value.name,
          description: this.themeForm.value.description,
          nominationDeadline: new Date(this.themeForm.value.nominationDeadline).toString(),
          votingDeadline: new Date(this.themeForm.value.votingDeadline).toString(),
          readingDeadline: new Date(this.themeForm.value.discussionDeadline).toString(),
          discussionDeadline: new Date(this.themeForm.value.discussionDeadline).toString(),
        }).subscribe(theme => {
          this.isLoading = false;
          this.refreshEvent.next(theme);
        });
      }
    });
  }

  createTheme(clubId: number): void {
    this.isEdit = false;
    const clubModal = this.modalService.open(this.content);
    clubModal.result.then(result => {
        if (result === ModalResults.SAVE) {
          let newTheme: ITheme = {
            clubId: clubId,
            nominatorId: this.session.currentUser?.id,
            name: this.themeForm.value.name,
            description: this.themeForm.value.description,
            status: ThemeStatus.OPEN,
            startDate: new Date().toString(),
            nominationDeadline: new Date(this.themeForm.value.nominationDeadline).toString(),
            votingDeadline: new Date(this.themeForm.value.votingDeadline).toString(),
            readingDeadline: new Date(this.themeForm.value.discussionDeadline).toString(),
            discussionDeadline: new Date(this.themeForm.value.discussionDeadline).toString(),
          }
          this.themeService.createTheme(newTheme)
            .subscribe(theme => {
              this.isLoading = false;
              this.refreshEvent.next(theme);
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
