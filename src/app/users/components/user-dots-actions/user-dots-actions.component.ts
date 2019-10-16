import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
    selector: 'app-user-dots-actions',
    templateUrl: './user-dots-actions.component.html'
})

export class UserDotsActionsComponent implements AfterViewInit {

    @Input() _id:string;

    constructor() { }

    ngAfterViewInit(): void {}

}
