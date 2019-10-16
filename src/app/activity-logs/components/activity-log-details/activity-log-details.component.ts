import { Component, OnInit } from '@angular/core';
import { ActivityLogsService } from 'app/activity-logs/services/activity-logs.service';
import { ActivatedRoute } from '@angular/router';
import { IActivityLog } from 'app/activity-logs/models/IActivityLog';

@Component({
  selector: 'app-activity-log-details',
  templateUrl: './activity-log-details.component.html'
})
export class ActivityLogDetailsComponent implements OnInit {

  public _id: any;
  public currentActivityLog: IActivityLog;

  constructor(private activityLogService: ActivityLogsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getActivityLogById();
  }

  getActivityLogById() {
    this._id = this.route.snapshot.params['id'];
    this.activityLogService.getActivityLog(this._id).subscribe(
      (ActivityLogDetails: IActivityLog) => {
        this.currentActivityLog = ActivityLogDetails;
      }
    );
  }

}
