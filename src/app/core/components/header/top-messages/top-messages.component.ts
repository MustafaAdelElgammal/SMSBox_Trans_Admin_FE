import {AfterViewInit, Component} from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-top-messages',
    templateUrl: './top-messages.component.html'
})

export class TopMessagesComponent implements AfterViewInit {

    constructor() { }

    ngAfterViewInit(): void {
        $.HSCore.components.HSDropdown.init($('#messagesInvoker'), {
            dropdownHideOnScroll: true,
            dropdownType: 'css-animation',
            dropdownAnimationIn: 'fadeIn',
            dropdownAnimationOut: 'fadeOut'
        });
    }

}
