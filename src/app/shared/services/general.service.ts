import { IAdminUsersShortList } from './../models/IAdminUsersShortList ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from "../models/ICountry";
import { BehaviorSubject, Subject } from "rxjs";
import { IMessageType } from "shared/models/IMessageType";
import { INetworkAll } from "shared/models/INetworkAll";
import { IRole } from 'shared/models/IRoles';
import { IAppName } from 'shared/models/IAppName';

@Injectable({ providedIn: 'root' })
export class GeneralService {
    constructor(private http: HttpClient) { }
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private countriesDataSource = new Subject<ICountry[]>();
    public countriesData = this.countriesDataSource.asObservable();
    public countries: ICountry[] = null;

    private networksDataSource = new Subject<INetworkAll[]>();
    public networksData = this.networksDataSource.asObservable();
    public networks: INetworkAll[] = null;

    private messageTypesDataSource = new Subject<IMessageType[]>();
    public messageTypesData = this.messageTypesDataSource.asObservable();
    public messageTypes: IMessageType[] = null;

    public roles: IRole[] = null;

    public getCountries() {
        return this.http.get<ICountry[]>('api/countries');
    }

    public updatedCountriesData(data) {
        this.countriesDataSource.next(data);
        this.countries = data;
    }

    public updatedNetworksData(data) {
        this.networksDataSource.next(data);
        this.networks = data;
    }
    public updatedMessageTypeData(data) {
        this.messageTypesDataSource.next(data);
        this.messageTypes = data;
    }

    public getAllNetworks() {
        return this.http.get<INetworkAll[]>('api/networks/allNetworks');
    }

    public getAllMessageTypes() {
        return this.http.get<IMessageType[]>('api/messageTypes');
    }

    public display(status: boolean) {
        this.status.next(status);
    }

    public getRoles() {
        return this.http.get<IRole[]>('api/authorization/adminUserRoles');
    }

    public getAppNames() {
        return this.http.get<IAppName[]>('api/appsNames');
    }

    public getAdminUsersShortList() {
        return this.http.get<IAdminUsersShortList[]>('api/adminUsers/shortList');
    }
}
