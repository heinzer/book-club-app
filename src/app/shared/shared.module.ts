import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { PasswordInputComponent } from './password-input/password-input.component';

export const components = [
  PasswordInputComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    ...components
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SharedModule { }
