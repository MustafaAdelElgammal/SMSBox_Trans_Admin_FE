import {AfterViewInit, Component} from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-top-notifications',
    templateUrl: './top-notifications.component.html'
})

export class TopNotificationsComponent implements AfterViewInit{

    constructor() { }

    ngAfterViewInit(): void {
        $.HSCore.components.HSDropdown.init($('#notificationsTopInvoker'), {
            dropdownHideOnScroll: true
        });
    }

}
