import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { FancyDeadlinePipe, DeadlinePipe, DeadlinePercentagePipe } from './deadlines.pipe';
import {DottedContainerComponent} from './containers/dotted-container/dotted-container.component';
import {BasePageComponent} from './base-page/base-page.component';
import {SolidContainerComponent} from './containers/solid-container/solid-container.component';
import {SolidContainerWithHoverComponent} from './containers/solid-container-with-hover/solid-container-with-hover.component';
import {PageBreadcrumbsComponent} from './page-breadcumbs/page-breadcrumbs.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faChevronRight, faPencil, faPlusCircle, faUserCircle, faUsers} from '@fortawesome/free-solid-svg-icons';
import {IconButtonComponent} from './icon-button/icon-button.component';
import {BreadcrumbComponent} from './page-breadcumbs/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';

export const components = [
  BasePageComponent,
  BreadcrumbComponent,
  DottedContainerComponent,
  IconButtonComponent,
  PageBreadcrumbsComponent,
  PasswordInputComponent,
  SolidContainerComponent,
  SolidContainerWithHoverComponent
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
    FormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    ...components,
    ...pipes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faPlusCircle, faUsers, faPencil, faChevronRight, faUserCircle);
  }
}
