import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PortedNumberService {

    constructor(private http: HttpClient) { }

    public getPortedNumber(number: number) {
        return this.http.get<IResGetPortedNumber>(`api/portedNumber/${number}`);
    }

    public addPortedNumber(data: IReqAddPortedNumber) {
        return this.http.post('api/portedNumber', data);
    }

}

export interface IReqAddPortedNumber {
    number: number;
    portedToNetworkId: string;
    details: string;
}

export interface IResGetPortedNumber {
    _id: string;
    number: number;
    portedToNetworkId: string;
    originalNetworkId: string;
    lastUpdatedOn: Date;
    details: string;
}
