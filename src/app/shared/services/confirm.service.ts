import { Injectable, Directive, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef, } from '@ng-bootstrap/ng-bootstrap';


export interface ConfirmOptions {
  title: string;
  message: string;
}

/**
 * An internal service allowing to access, from the confirm modal component, the options and the modal reference.
 * It also allows registering the TemplateRef containing the confirm modal component.
 *
 * It must be declared in the providers of the NgModule, but is not supposed to be used in application code
 */
@Injectable({ providedIn: 'root' })
export class ConfirmState {
  /**
   * The last options passed ConfirmService.confirm()
   */
  options: ConfirmOptions;

  /**
   * The last opened confirmation modal
   */
  modal: NgbModalRef;

  /**
   * The template containing the confirmation modal component
   */
  template: TemplateRef<any>;
}

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable({ providedIn: 'root' })
export class ConfirmService {

    constructor(private modalService: NgbModal, private state: ConfirmState) {}

    confirm(options: ConfirmOptions): Promise<any> {
        this.state.options = options;
        this.state.modal = this.modalService.open(this.state.template, { centered: true });
        return this.state.modal.result;
    }
}

@Directive({
  selector: "[appConfirm]"
})
export class ConfirmTemplateDirective {
  constructor(confirmTemplate: TemplateRef<any>, state: ConfirmState) {
    state.template = confirmTemplate;
  }
}
