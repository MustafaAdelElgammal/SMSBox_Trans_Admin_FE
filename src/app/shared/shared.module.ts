import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { NgxMaskModule } from "ngx-mask";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { NgSelectModule } from "@ng-select/ng-select";
import { TagInputModule } from "ngx-chips";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { PageSizeComponent } from "./components/page-size/page-size.component";
import { ShowHideDotsDirective } from "./directives/show-hide-dots.directive";
import { CountryCodePipe } from "./pipes/country-code.pipe";
import { MainLoaderComponent } from "./components/main-loader/main-loader.component";
import { HandlerMessagesComponent } from "./components/handler-messages/handler-messages.component";
import { FilterFormTailComponent } from "./components/filter-form-tail/filter-form-tail.component";
import { SortElementComponent } from "./components/sort-element/sort-element.component";
import { RouterModule } from "@angular/router";
import { ConfirmModalComponent } from "shared/components/confirm-modal/confirm-modal.component";
import { ConfirmTemplateDirective } from "shared/services/confirm.service";
import { BreadcrumbComponent } from "shared/components/breadcrumb/breadcrumb.component";
import { FilterFormHeadComponent } from "shared/components/filter-form-head/filter-form-head.component";
import { ReplaceUnderscoreWithSpacePipe } from "shared/pipes/replace-underscore-with-space.pipe";
import { CountriesDropdownComponent } from './components/countries-dropdown/countries-dropdown.component';
import { NetworksDropdownComponent } from './components/networks-dropdown/networks-dropdown.component';
import { MessageTypesDropdownComponent } from './components/message-types-dropdown/message-types-dropdown.component';
import { RolesDropdownComponent } from './components/roles-dropdown/roles-dropdown.component';
import { NetworkCodePipe } from "shared/pipes/network-code.pipe";
import { MessageTypeCodePipe } from "shared/pipes/message-type-code.pipe";

@NgModule({
    declarations: [
        ShowHideDotsDirective,
        CountryCodePipe,
        NetworkCodePipe,
        MessageTypeCodePipe,
        ReplaceUnderscoreWithSpacePipe,
        MainLoaderComponent,
        HandlerMessagesComponent,
        PageSizeComponent,
        FilterFormTailComponent,
        SortElementComponent,
        ConfirmTemplateDirective,
        BreadcrumbComponent,
        FilterFormHeadComponent,
        ConfirmModalComponent,
        CountriesDropdownComponent,
        NetworksDropdownComponent,
        MessageTypesDropdownComponent,
        RolesDropdownComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,

        Ng2FlatpickrModule,
        NgSelectModule,
        TagInputModule,
        NgbModule,
        NgxMaskModule.forRoot()
    ],
    exports: [
        CommonModule,
        FormsModule,
        BreadcrumbComponent,
        PageSizeComponent,
        ReactiveFormsModule,
        RouterModule,
        FilterFormHeadComponent,
        Ng2FlatpickrModule,
        NgSelectModule,
        TagInputModule,
        NgbModule,
        ShowHideDotsDirective,
        CountryCodePipe,
        NetworkCodePipe,
        MainLoaderComponent,
        HandlerMessagesComponent,
        FilterFormTailComponent,
        SortElementComponent,
        ConfirmModalComponent,
        CountriesDropdownComponent,
        NetworksDropdownComponent,
        MessageTypesDropdownComponent,
        RolesDropdownComponent,
        MessageTypeCodePipe,
        ConfirmTemplateDirective,
        ReplaceUnderscoreWithSpacePipe,
        NgxMaskModule.forRoot().ngModule
    ]
})
export class SharedModule { }
