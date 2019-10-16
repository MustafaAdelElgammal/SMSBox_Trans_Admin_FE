import {Component, OnInit} from '@angular/core';
import {LOG_LEVEL} from "../../models/LOG_LEVEL";
import {ILog} from "../../models/ILog";
import {IReqLogSearchQuery, IResGetLogsList, LogService} from "../../services/log.service";
import {BaseListView} from "shared/BaseListView";
import {GeneralService} from "shared/services/general.service";
import {IAppName} from "shared/models/IAppName";

@Component({
    selector: 'app-log-page',
    templateUrl: './log-page.component.html'
})

export class LogPageComponent extends BaseListView implements OnInit {

    public LOGLEVEL = LOG_LEVEL;
    logLevels = [
        {value: '', name: 'All Status', colors:['u-btn-black']},
        {value: this.LOGLEVEL.Info, name: 'Info', colors: ['u-btn-blue']},
        {value: this.LOGLEVEL.Warning, name: 'Warning', colors: ['u-btn-orange']},
        {value: this.LOGLEVEL.Error, name: 'Error', colors: ['u-btn-primary']},
        {value: this.LOGLEVEL.Fatal, name: 'Fatal', colors: ['u-btn-darkred']}
    ];
    selectedLogLevels = '';

    public logs: ILog[];
    public query: IReqLogSearchQuery ;
    public appNames: IAppName[] = [{_id:'',name:'All Apps'}];
    public selectedAppName = '';


    constructor(
        private logService: LogService,
        private generalService: GeneralService) {
        super({page: '1', size: '10', app_name:'', logLevel:'', createdOnFrom:'', createdOnTo:''});
    }

    ngOnInit() {
        this.generalService.getAppNames().subscribe(data => {
          this.appNames = this.appNames.concat(data);
        });
        this.callHttp();
    }

    callHttp(): void {
        this.hideTable();
        this.logService.getLogList(this.query).subscribe(
            (res: IResGetLogsList) => {
                this.logs = res.data;
                this.showTable(res, this.logs.length);
            },
            error => {this.onHttpError(error);}
        );
    }

    setQuery(values): void {
        this.query.page = '1';
        this.query.app_name = values.app_name || '';
        this.query.logLevel = values.logLevel || '';
        if(values.createdOnFrom !== '') {
            this.query.createdOnFrom = `${values.createdOnFrom}T00:00:00.000Z`;
        } else {
            this.query.createdOnFrom = '';
        }
        if(values.createdOnTo !== '') {
            this.query.createdOnTo = `${values.createdOnTo}T23:59:59.999Z`;
        } else {
            this.query.createdOnTo = '';
        }
        this.callHttp();
    }

}
