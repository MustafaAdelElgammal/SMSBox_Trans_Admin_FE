import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResSMSAccount, IResGetSMSAccount } from '../models/sms-accounts/sms-accounts-response';
import { IReqUpdateSMSAccount, IReqCreateSMSAccount } from '../models/sms-accounts/sms-accounts-request';

@Injectable({
  providedIn: 'root'
})

export class SMSAccountsService {

  constructor(private http: HttpClient) { }

  public getAllSMSAccounts() {
    return this.http.get<IResSMSAccount[]>('api/SMSAccounts');
  }

  public createSMSAccount(data: IReqCreateSMSAccount) {
    return this.http.post('api/SMSAccounts', data);
  }

  public updateSMSAccount(data: IReqUpdateSMSAccount) {
    return this.http.put('api/SMSAccounts', data);
  }

  public getSMSAccountById(id: string) {
    return this.http.get<IResGetSMSAccount>(`api/SMSAccounts/${id}`);
}

}
