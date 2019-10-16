import { NgModule } from '@angular/core';
import {SharedModule} from "shared/shared.module";
import {HeaderComponent} from "./components/header/header.component";
import {TopMessagesComponent} from "./components/header/top-messages/top-messages.component";
import {TopNotificationsComponent} from "./components/header/top-notifications/top-notifications.component";
import {TopUserComponent} from "./components/header/top-user/top-user.component";
import {TopUserMobileComponent} from "./components/header/top-user-mobile/top-user-mobile.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {FooterComponent} from "./components/footer/footer.component";

@NgModule({
    declarations: [
        HeaderComponent,
        TopMessagesComponent,
        TopNotificationsComponent,
        TopUserComponent,
        TopUserMobileComponent,
        SidebarComponent,
        FooterComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        HeaderComponent,
        TopMessagesComponent,
        TopNotificationsComponent,
        TopUserComponent,
        TopUserMobileComponent,
        SidebarComponent,
        FooterComponent
    ]
})
export class CoreModule { }
