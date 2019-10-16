export interface IReqCreateSMSAccount {
  provider: string;
  name: string;
  account_sid: string;
  auth_token: string;
  customerId: number;
}

export interface IReqUpdateSMSAccount extends IReqCreateSMSAccount {
  smsAccountId: string;
}
