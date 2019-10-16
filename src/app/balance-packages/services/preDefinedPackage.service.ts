import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {INetworkPrice, IPreDefinedPackage, IPreDefinedPackageOne, IPreDefinedPackagePage} from "../models/IPreDefinedPackage";

@Injectable({ providedIn: 'root' })

export class PreDefinedPackageService {

    constructor(private http: HttpClient) { }

    public getAllPreDefinedPackages() {
        return this.http.get<IPreDefinedPackage[]>('api/preDefinedPackages');
    }

    public getPreDefinedPackagesPaging(preDefinedPackageList: IReqPackageSearchQuery) {
        const params = new HttpParams()
            .set('page', preDefinedPackageList.page)
            .set('size', preDefinedPackageList.size)
            .set('name', preDefinedPackageList.name)
            .set('countryId', preDefinedPackageList.countryId)
            .set('amountFrom', preDefinedPackageList.amountFrom)
            .set('amountTo', preDefinedPackageList.amountTo)
            .set('active', preDefinedPackageList.active)
            .set('createdOnFrom', preDefinedPackageList.createdOnFrom)
            .set('createdOnTo', preDefinedPackageList.createdOnTo)
            .set('sortBy', preDefinedPackageList.sortBy)
            .set('sortValue', preDefinedPackageList.sortValue);
        return this.http.get<IResPackagesList>('api/preDefinedPackages/page', { params: params });
    }

    public getPreDefinedPackage(id: string) {
        return this.http.get<IPreDefinedPackageOne>(`api/preDefinedPackages/${id}`);
    }

    public createPreDefinedPackage(data: IReqCreatePackage) {
        return this.http.post('api/preDefinedPackages', data);
    }

    public deActivatePreDefinedPackage(id: string) {
        return this.http.put(`api/preDefinedPackages/${id}`, null);
    }

}

export interface IReqPackageSearchQuery {
    page: string;
    size: string;
    name?: string;
    countryId?: string;
    amountFrom?: string;
    amountTo?: string;
    active?: string;
    createdOnFrom?: string;
    createdOnTo?: string;
    sortBy?: string;
    sortValue?: string;
}

export interface IResPackagesList {
    data: IPreDefinedPackagePage[];
    total: number;
    numberOfPages: number;
}

export interface IReqCreatePackage {
    name: string;
    expirationInMonths: number;
    amount: number;
    limitedToCountryId: string;
    pointPrice: number;
    networkPrices: INetworkPrice[];
}
