import {Component, Input} from '@angular/core';
import {ConfirmOptions, ConfirmState} from "shared/services/confirm.service";

@Component({
      selector: 'app-confirm-modal',
      templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {

    public options: ConfirmOptions;
    @Input() withDetails = false;
    details;

    constructor(private state: ConfirmState) {
        this.options = state.options;
    }

    yes(details) {
        this.state.modal.close(details);
    }

    no() {
        this.state.modal.dismiss('not confirmed');
    }

}
