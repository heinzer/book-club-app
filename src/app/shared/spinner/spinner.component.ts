import {Component} from "@angular/core";

@Component({
  selector: 'app-spinner',
  template: `
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>`
})
export class SpinnerComponent {

}
