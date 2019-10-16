import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IActivityLog} from "../models/IActivityLog";

@Injectable({ providedIn: 'root' })
export class ActivityLogsService {

    constructor(private http: HttpClient) { }

    public getActivityLogsList(activityLogList: IReqActivityLogSearchQuery) {
        const params = new HttpParams()
            .set('page', activityLogList.page)
            .set('size', activityLogList.size)
            .set('userId', activityLogList.userId)
            .set('activity', activityLogList.activity)
            .set('createdOnFrom', activityLogList.createdOnFrom)
            .set('createdOnTo', activityLogList.createdOnTo);
        return this.http.get<IResGetActivityLogsList>('api/activityLog', { params: params });
    }

    public getActivityLog(id: string) {
      return this.http.get<IActivityLog>(`api/activityLog/${id}`);
  }

}

export interface IReqActivityLogSearchQuery {
    page: string;
    size: string;
    userId?: string;
    activity?: string;
    createdOnFrom?: string;
    createdOnTo?: string;
}

export interface IResGetActivityLogsList {
    data: IActivityLog[];
    total: number;
    numberOfPages: number;
}
