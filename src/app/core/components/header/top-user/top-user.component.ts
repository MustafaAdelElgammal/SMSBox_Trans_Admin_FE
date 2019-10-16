import {AfterViewInit, Component} from '@angular/core';
import {AuthenticationService} from "shared/services/auth.service";
declare var $: any;

@Component({
    selector: 'app-top-user',
    templateUrl: './top-user.component.html'
})

export class TopUserComponent implements AfterViewInit {

    userEmail:string = localStorage.getItem('email');

    constructor(private auth: AuthenticationService) {}

    logout() {
        this.auth.logout();
    }

    ngAfterViewInit(): void {
        $.HSCore.components.HSDropdown.init($('#profileMenuInvoker'), {
          dropdownHideOnScroll: true,
          dropdownType: 'css-animation',
          dropdownAnimationIn: 'fadeIn',
          dropdownAnimationOut: 'fadeOut'
        });
    }

}
