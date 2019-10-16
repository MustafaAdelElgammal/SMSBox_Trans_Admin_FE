import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IUser} from "../models/IUser";

@Injectable({ providedIn: 'root' })

export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsersList(userList: IReqUserSearchQuery) {
    const params = new HttpParams()
      .set('page', userList.page)
      .set('size', userList.size)
      .set('email', userList.email)
      .set('active', userList.active)
      .set('senders', userList.senders)
      .set('phoneNumber', userList.phoneNumber)
      .set('createdOn_to', userList.createdOn_to)
      .set('createdOn_from', userList.createdOn_from);
    return this.http.get<IResGetUsersList>('api/users', { params: params });
  }

  public getUser(user: IReqGetUser) {
    const params = new HttpParams()
      .set('email', user.email)
      .set('phoneNumber', user.phoneNumber);
    return this.http.get('api/users/getUser', { params: params });
  }

  public addPackageToUser(data: IReqAddPackageToUser) {
    return this.http.put('api/users/addPackage', data);
  }

}

export interface IReqUserSearchQuery {
  page: string;
  size: string;
  phoneNumber?: string;
  email?: string;
  active?: string;
  senders?: string;
  createdOn_to?: string;
  createdOn_from?: string;
}

export interface IResGetUsersList {
  data: IUser[];
  numberOfPages: number;
  total:number;
}

export interface IReqGetUser {
  email: string;
  phoneNumber: string;
}

export interface IReqAddPackageToUser {
  userId: string;
  packageId: string;
  available: number;
}
