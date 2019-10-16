import {Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        $.HSCore.components.HSSideNav.init('.js-side-nav');
    }

}
