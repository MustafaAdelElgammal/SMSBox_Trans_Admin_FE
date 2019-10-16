import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IReqAdminUsersSearchQuery} from "../../services/adminUser.service";
import {BaseFilterFormView} from "shared/abstracts/BaseFilterFormView";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-admin-user-filter-form',
    templateUrl: './admin-user-filter-form.component.html'
})

export class AdminUserFilterFormComponent extends BaseFilterFormView<IReqAdminUsersSearchQuery> implements  OnInit {

    @Input() query ;
    @Output() onFilter = new EventEmitter<void>();

    constructor() {super();}

    ngOnInit() {

        this.filterForm = new FormGroup({

            name: new FormControl(''),
            email: new FormControl(''),
            role: new FormControl(''),
            createdOn_from: new FormControl(''),
            createdOn_to: new FormControl('')

        });

    }

    setQuery(): void {

        this.query.name = this.filterForm.value.name;
        this.query.email = this.filterForm.value.email;
        this.query.role = this.filterForm.value.role;

        this.query.createdOn_from = this.dateToString(this.filterForm.value.createdOn_from);
        this.query.createdOn_to = this.dateToString(this.filterForm.value.createdOn_to);

    }

    resetForm(): void {

        this.filterForm.reset({

            name: '',
            email: '',
            role: '',
            createdOn_from: '',
            createdOn_to: ''

        });

    }

    resetQuery(): void {

        this.query.name = '';
        this.query.email = '';
        this.query.role = '';
        this.query.createdOn_from = '';
        this.query.createdOn_to = '';

    }

}
