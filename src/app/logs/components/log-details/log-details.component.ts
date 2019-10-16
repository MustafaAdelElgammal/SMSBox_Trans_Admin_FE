import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ILog} from "../../models/ILog";
import {LogService} from "../../services/log.service";
import {LOG_LEVEL} from "../../models/LOG_LEVEL";

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html'
})
export class LogDetailsComponent implements OnInit {

  public _id: any;
  public currentLog: ILog;

  public LOGLEVEL = LOG_LEVEL;
  logLevels = [
    {value: '', name: 'All Status', colors:['u-btn-black']},
    {value: this.LOGLEVEL.Info, name: 'Info', colors: ['u-btn-blue']},
    {value: this.LOGLEVEL.Warning, name: 'Warning', colors: ['u-btn-orange']},
    {value: this.LOGLEVEL.Error, name: 'Error', colors: ['u-btn-primary']},
    {value: this.LOGLEVEL.Fatal, name: 'Fatal', colors: ['u-btn-darkred']}
  ];
  constructor(private logService: LogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getActivityLogById();
  }

  getActivityLogById() {
    this._id = this.route.snapshot.params['id'];
    this.logService.getLog(this._id).subscribe(
      (logDetails: ILog) => {
        this.currentLog = logDetails;
      },
      error => {}
    );
  }

}
