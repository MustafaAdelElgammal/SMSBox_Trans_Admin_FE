import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ILog} from "../models/ILog";

@Injectable({ providedIn: 'root' })

export class LogService {

    constructor(private http: HttpClient) { }

    public getLogList(logListQuery: IReqLogSearchQuery) {
        const params = new HttpParams()
            .set('page', logListQuery.page)
            .set('size', logListQuery.size)
            .set('logLevel', logListQuery.logLevel)
            .set('app_name', logListQuery.app_name)
            .set('createdOnFrom', logListQuery.createdOnFrom)
            .set('createdOnTo', logListQuery.createdOnTo);
        return this.http.get<IResGetLogsList>('api/logs', { params: params });
    }

    public getLog(id: string) {
        return this.http.get<ILog>(`api/logs/${id}`);
    }

    public getAllAppsNames() {
        return this.http.get<string[]>('api/appsNames');
    }

}

export interface IReqLogSearchQuery {
    page: string;
    size: string;
    message?: string;
    logLevel?: string;
    app_name?: string;
    createdOnFrom?: string;
    createdOnTo?: string;
}

export interface IResGetLogsList {
    data: ILog[];
    numberOfPages: number;
}
