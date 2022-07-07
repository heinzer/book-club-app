import {Component} from '@angular/core';
import {CurrentSessionService} from "../../services/current-session.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(public session: CurrentSessionService) {}
}
