import { Component } from '@angular/core';
import { CurrentSessionService } from './services/current-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-club-app';

  constructor(public session: CurrentSessionService) {}
}
