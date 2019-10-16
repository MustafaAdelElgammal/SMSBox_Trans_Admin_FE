import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminUsersService, IReqAdminUsersSearchQuery, IResGetAdminUsers} from "../../services/adminUser.service";
import {BaseListView} from "shared/abstracts/BaseListView";

@Component({
    selector: 'app-admin-user-list-page',
    templateUrl: './admin-user-list-page.component.html'
})

export class AdminUserListPageComponent extends BaseListView<IReqAdminUsersSearchQuery> implements OnInit {

    public userAdmins = [];
    public hasAddUser = false;

    query: IReqAdminUsersSearchQuery = {
        name:'',
        email:'',
        role:'',
        createdOn_from:'',
        createdOn_to:'',
        page:'1',
        size:'10'
    };

    constructor(
        private adminUsersService: AdminUsersService,
        private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        if(this.route.snapshot.queryParams['add']) {
            this.hasAddUser = true;
        }
        this.callHttp();
    }

    callHttp(): void {
        this.hideTable();
        this.adminUsersService.getAdminUsers(this.query).subscribe(
            (res: IResGetAdminUsers) => {
              this.userAdmins = res.data;
              this.showTable(res, this.userAdmins.length);
            },
            error => {this.onHttpError(error);}
        );
    }
}
