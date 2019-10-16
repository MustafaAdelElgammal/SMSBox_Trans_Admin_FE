import {Component, OnInit} from '@angular/core';
import {IReqUserSearchQuery, IResGetUsersList, UsersService} from "../../services/users.service";
import {IUser} from "../../models/IUser";
import {BaseListView} from "shared/BaseListView";

@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html'
})

export class ListPageComponent extends BaseListView implements OnInit {

    public statuses = [
        {value: '', name: 'All', colors: ['u-btn-black']},
        {value: true, name: 'Active', colors: ['g-bg-teal-v2']},
        {value: false, name: 'Inactive', colors: ['g-brd-primary']}
    ];
    public selectedStatuses = this.statuses[0].value;

    public users: IUser[];
    public query: IReqUserSearchQuery;

    constructor(private userService: UsersService) {
        super({
          page: '1',
          size: '10',
          active:'',
          senders:'',
          phoneNumber: '',
          email: '',
          createdOn_to: '',
          createdOn_from: ''
        });
    }

    public ngOnInit() {
        this.callHttp();
    }

    callHttp(): void {
        this.hideTable();
        this.userService.getUsersList(this.query).subscribe(
            (res: IResGetUsersList) => {
                this.users = res.data;
                this.showTable(res, this.users.length);
            },
            error => {
                this.onHttpError(error);
            }
        );
    }

    setQuery(values:IReqUserSearchQuery): void {
        this.query.page = '1';
        this.query.email = values.email;
        this.query.phoneNumber = values.phoneNumber;
        this.query.senders = values.senders;
        this.query.active =values.active;
        if(values.createdOn_from !== '') {
            this.query.createdOn_from = `${values.createdOn_from}T00:00:00.000Z`;
        } else {
            this.query.createdOn_from = '';
        }
        if(values.createdOn_to !== '') {
            this.query.createdOn_to = `${values.createdOn_to}T23:59:59.999Z`;
        } else {
            this.query.createdOn_to = '';
        }
    }

}
