import {AfterViewInit, Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})


export class SidebarComponent implements OnInit, AfterViewInit {

    public ngOnInit() {}

    ngAfterViewInit(): void {
        $(document).ready(() => {
            const activeItem = $("#sideNavMenu").find(".u-side-nav--has-sub-menu ul li a.active").eq(0);
            activeItem.parents('ul').eq(0).css('display','block');
        });
        $.HSCore.helpers.HSHamburgers.init('.hamburger');
        $.HSCore.components.HSScrollBar.init($('.side-bar-navigation'));
    }

}
