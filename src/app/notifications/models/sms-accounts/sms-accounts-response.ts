export interface IResSMSAccount {
  _id: string;
  provider: string;
  name: string;
}

export interface IResGetSMSAccount {
  _id: string;
  provider: string;
  name: string;
  account_sid: string;
  auth_token: string;
  customerId: number;
}
