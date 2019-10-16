import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
    selector: 'app-admin-user-dots-actions',
    templateUrl: './admin-user-dots-actions.component.html'
})

export class AdminUserDotsActionsComponent implements AfterViewInit {

    @Input() _id:string;

    constructor() { }

    ngAfterViewInit(): void {}

}
