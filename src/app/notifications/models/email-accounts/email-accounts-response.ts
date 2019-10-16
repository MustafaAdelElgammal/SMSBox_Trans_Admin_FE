import { IReqAddEmailAccount } from '../email-accounts/email-accounts-request';
export interface IResGetEmailAccount extends IReqAddEmailAccount {
    _id: string;
}