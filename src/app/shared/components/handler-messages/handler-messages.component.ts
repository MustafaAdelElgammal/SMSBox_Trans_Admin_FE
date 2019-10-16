import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-handler-messages',
  templateUrl: './handler-messages.component.html'
})
export class HandlerMessagesComponent implements OnInit {

    @Input() public formErrorMessage;
    @Input() public formSuccessfullyMessage;

    constructor() { }

    ngOnInit() {
    }

}
