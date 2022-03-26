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

  private _stage: string;
  @Input()
  set stage(stage: string) {
    this._stage = stage;
  }

  get stage(): string {
    return this._stage;
  }

  private _percentage: number;
  @Input()
  set percentage(percentage: number) {
    this._percentage = percentage;
    console.log('percentage:',percentage)
  }

  get percentage(): number {
    return this._percentage;
  }

  constructor() {    }
}
