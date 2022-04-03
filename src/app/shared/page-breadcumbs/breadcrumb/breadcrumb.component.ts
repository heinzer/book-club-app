import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() label: string;
  @Input() route: string;

  constructor(private router: Router) {}

  navigateRoute(route: string): void {
    console.log(route);
    // this.router.navigate([route]);
  }
}
