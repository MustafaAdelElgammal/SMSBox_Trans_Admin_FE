import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IAdminUserRole} from "../models/IAdminUserRole";

@Injectable({ providedIn: 'root' })

export class RolesService {

    constructor(private http: HttpClient) { }

    public getAdminRoles() {
        return this.http.get<IAdminUserRole[]>('api/authorization/adminUserRoles');
    }

}
