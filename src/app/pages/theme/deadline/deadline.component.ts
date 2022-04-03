import { Component, Input } from '@angular/core';
import { ITheme } from '../../../models/data-models';

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.scss']
})
export class DeadlineComponent {
  private _date: string;
  @Input()
  set date(date: string) {
    this._date = date;
  }

  get date(): string {
    return this._date;
  }

  private _stage: ThemePhase;
  @Input()
  set stage(stage: ThemePhase) {
    this._stage = stage;
  }

  get stage(): ThemePhase {
    return this._stage;
  }

  private _percentage: number;
  @Input()
  set percentage(percentage: number) {
    this._percentage = percentage;
  }

  get percentage(): number {
    return this._percentage;
  }

  constructor() {    }
}

export enum ThemePhase {
  NOMINATE,
  VOTE,
  READ
}
