import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IBlacklistedNumber} from "../models/IBlacklistedNumber";

@Injectable({ providedIn: 'root' })

export class BlacklistedNumberService {

    constructor(private http: HttpClient) { }

    public getBlackListedNumbers(blackList: IReqBlackListSearchQuery) {
        const params = new HttpParams()
            .set('page', blackList.page)
            .set('size', blackList.size)
            .set('number', blackList.number);
        return this.http.get<IResGetBlackListedNumbers>('api/blacklistedNumber', { params: params });
    }

    public getBlackListedNumber(number: number) {
        return this.http.get<IResGetBlackListedNumber>(`api/blacklistedNumber/${number}`);
    }

    public addBlackListedNumber(data: IReqAddBlackListedNumber) {
        return this.http.post('api/blacklistedNumber', data);
    }

    public deleteBlackListedNumber(data: IReqAddBlackListedNumber) {
        const params = new HttpParams().set('details', data.details);
        return this.http.delete(`api/blacklistedNumber/${data.number}`, { params: params });
    }

}

export interface IReqBlackListSearchQuery {
    page: string;
    size: string;
    number?: string;
}

export interface IResGetBlackListedNumbers {
    data: IBlacklistedNumber[];
    total: number;
    numberOfPages: number;
}

export interface IReqAddBlackListedNumber {
    number: number;
    details: string;
}

export interface IResGetBlackListedNumber {
    data: IBlacklistedNumber;
}
