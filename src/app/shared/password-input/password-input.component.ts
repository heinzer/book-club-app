import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  @Input() password: string = "";
  @Output() passwordChange = new EventEmitter<string>();

  hidePassword: boolean = true;
  toggleHide() {
    this.hidePassword = !this.hidePassword;
  }

  updatePassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
    this.passwordChange.emit(this.password);
  }
}
