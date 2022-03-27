import {Component} from '@angular/core';

@Component({
  selector: 'app-base-page',
  template: '<div class="page"><ng-content></ng-content></div>',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent {}
