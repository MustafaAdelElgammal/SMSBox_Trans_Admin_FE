export interface IUser {
  _id: string;
  email: string;
  phoneNumber: number;
  active?: boolean;
  createdOn?: Date;
}

export interface IUserOne {
  _id: string;
  email: string;
  phoneNumber: number;
  active:boolean;
}
