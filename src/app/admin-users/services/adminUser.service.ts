import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IAdminUser, IAdminUserOne} from "../models/IAdminUser";
import {IReqBaseSearchQuery} from "shared/models/IReqBaseSearchQuery";
import {IResGetListMain} from "shared/models/IResGetListMain";

@Injectable({ providedIn: 'root' })

export class AdminUsersService {

    constructor(private http: HttpClient) { }

    public getAdminUsers(query: IReqAdminUsersSearchQuery) {
        const params = new HttpParams()
            .set('page', query.page)
            .set('size', query.size)
            .set('email', query.email)
            .set('name', query.name)
            .set('createdOn_from', query.createdOn_from)
            .set('createdOn_to', query.createdOn_to)
            .set('role', query.role);
        return this.http.get<IResGetAdminUsers>('api/adminUsers', { params: params });
    }

    public getAdminUserById(id: string) {
        return this.http.get<IAdminUserOne>(`api/adminUsers/${id}`);
    }

    public createAdminUser(data: IReqCreateAdminUser) {
        return this.http.post('api/adminUsers', data);
    }

    public updateAdminUser(data: IReqUpdateAdminUser) {
        return this.http.put('api/adminUsers', data);
    }

    public changeAdminUserPassword(data: IReqChangeAdminUserPassword) {
        return this.http.put('api/adminUsers/password', data);
    }

}

export interface IReqAdminUsersSearchQuery extends IReqBaseSearchQuery {
    email: string;
    name: string;
    createdOn_from: string;
    createdOn_to: string;
    role: string;
}

export interface IResGetAdminUsers  extends IResGetListMain {
    data: IAdminUser[];
}

export interface IReqCreateAdminUser {
    email: string;
    name: string;
    roles: string[];
}

export interface IReqUpdateAdminUser {
    adminUserId: string;
    name: string;
    active: boolean;
    roles: string[];
}

export interface IReqChangeAdminUserPassword {
    adminUserId: string;
    new_password: string;
}
