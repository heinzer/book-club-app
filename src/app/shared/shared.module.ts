import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { FancyDeadlinePipe, DeadlinePipe, DeadlinePercentagePipe } from './deadlines.pipe';
import {DottedContainerComponent} from './dotted-container/dotted-container.component';
import {BasePageComponent} from './base-page/base-page.component';
import {SolidContainerComponent} from './solid-container/solid-container.component';

export const components = [
  BasePageComponent,
  DottedContainerComponent,
  PasswordInputComponent,
  SolidContainerComponent
];

export const pipes = [
  FancyDeadlinePipe,
  DeadlinePipe,
  DeadlinePercentagePipe
];

@NgModule({
  declarations: [
    ...components,
    ...pipes
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    ...components,
    ...pipes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SharedModule { }
