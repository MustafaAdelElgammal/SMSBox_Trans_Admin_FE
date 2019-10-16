import { IReqAddEmailAccount, IReqUpdateEmailAccount } from '../models/email-accounts/email-accounts-request';
import { IResGetEmailAccount } from '../models/email-accounts/email-accounts-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class EmailAccountService {

    constructor(private http: HttpClient) { }

    public getEmailAccount(id: string) {
        return this.http.get<IResGetEmailAccount>(`api/emailAccounts/${id}`);
    }

    public getEmailAccounts() {
        return this.http.get<IResGetEmailAccount[]>(`api/emailAccounts`);
    }

    public addEmailAccount(data: IReqAddEmailAccount) {
        return this.http.post('api/emailAccounts', data);
    }

    public updateEmailAccount(data: IReqUpdateEmailAccount) {
        return this.http.put('api/emailAccounts', data);
    }
}





