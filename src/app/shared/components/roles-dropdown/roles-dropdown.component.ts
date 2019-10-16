import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from "shared/services/general.service";
import { FormGroup } from "@angular/forms";
import { IRole } from "shared/models/IRoles";

@Component({
    selector: 'app-roles-dropdown',
    templateUrl: './roles-dropdown.component.html'
})
export class RolesDropdownComponent implements OnInit {

    @Input() inputFormName: string;
    @Input() placeHolder: string;
    @Input() tabNumber: number;
    @Input() hasError = false;
    @Input() label: string;
    @Input() isRequired = false;
    @Input() selectedRole = null;
    @Input() parentForm: FormGroup;

    public roles: IRole[] = [{_id:''}];

    constructor(private generalService: GeneralService) { }

    ngOnInit() {
        this.generalService.getRoles().subscribe(data => {
            this.roles = data;
        });
    }

}
