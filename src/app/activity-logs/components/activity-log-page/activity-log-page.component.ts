import { Component, OnInit } from '@angular/core';
import {IActivityLog} from "../../models/IActivityLog";
import {ActivityLogsService, IReqActivityLogSearchQuery, IResGetActivityLogsList} from "../../services/activity-logs.service";
import {BaseListView} from "shared/BaseListView";
import {GeneralService} from "shared/services/general.service";
import {IRole} from "shared/models/IRoles";
import {IAdminUsersShortList} from "shared/models/IAdminUsersShortList ";

@Component({
    selector: 'app-activity-log-page',
    templateUrl: './activity-log-page.component.html'
})
export class ActivityLogPageComponent extends BaseListView implements OnInit {

    public logsActivity: IActivityLog[];
    public query: IReqActivityLogSearchQuery ;
    public adminUsers: IAdminUsersShortList[] = [{email:'All Users', _id:''}];
    public selectedUser = '';
    constructor(private activityLogService: ActivityLogsService,
                private generalService: GeneralService) {
        super({page: '1', size: '10', userId: '', activity: '', createdOnFrom: '', createdOnTo: ''});
    }

    ngOnInit() {
        this.generalService.getAdminUsersShortList().subscribe(data => {
            this.adminUsers = this.adminUsers.concat(data);
        });
        this.callHttp();
    }

    callHttp(): void {
        this.hideTable();
        this.activityLogService.getActivityLogsList(this.query).subscribe(
            (res: IResGetActivityLogsList) => {
                this.logsActivity = res.data;
                this.showTable(res, this.logsActivity.length);
            },
            error => {this.onHttpError(error);}
        );
    }

    setQuery(values): void {
        this.query.page = '1';
        this.query.userId = values.userId || '';
        this.query.activity = values.activity || '';
        this.query.createdOnFrom = values.createdOnFrom || '';
        this.query.createdOnTo = values.createdOnTo || '';
    }
}
