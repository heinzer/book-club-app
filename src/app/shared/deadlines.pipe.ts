import { Pipe, PipeTransform } from '@angular/core';
import { ITheme } from '../models/data-models';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat)

@Pipe({name: 'fancyDeadline'})
export class FancyDeadlinePipe implements PipeTransform {
  transform(theme: ITheme): string {
    let now = new Date();

    if (theme.status === "CLOSED") {
      return `Discussion took place on ${dayjs(theme.discussionDeadline).format('MMMM Do')}`;
    }

    if (new Date(theme.nominationDeadline) > now) {
      return `Nominations open until ${dayjs(theme.nominationDeadline).format('MMMM Do')}`;
    }

    if (new Date(theme.votingDeadline) > now) {
      return `Voting open until ${dayjs(theme.votingDeadline).format('MMMM Do')}`;
    }

    if (new Date(theme.discussionDeadline) > now) {
      return `Discussion on ${dayjs(theme.discussionDeadline).format('MMMM Do')}`;
    }
    return ''; // we shouldn't get here
  }
}

@Pipe({name: 'deadline'})
export class DeadlinePipe implements PipeTransform {
  transform(date: string, stage: string): string {
    let now = new Date();
    let deadline = new Date(date);

    if (deadline > now) {
      return `${stage} until ${dayjs(date).format('MMMM Do')}`;
    } else {
      return `${stage} ended on ${dayjs(date).format('MMMM Do')}`;
    }
  }
}

@Pipe({name: 'deadlinePercentage'})
export class DeadlinePercentagePipe implements PipeTransform {
  transform(startDate: string, endDate: string): number {
    let start = dayjs(startDate);
    let end = dayjs(endDate);
    let now = dayjs();

    if (now.isBefore(start)) return 0;

    let startEndDiff = end.diff(start);
    let startNowDiff = now.diff(start);

    let diff = (startNowDiff / startEndDiff) * 100;
    if (diff >= 100) {
      return 100;
    } else {
      return diff;
    }
  }
}
