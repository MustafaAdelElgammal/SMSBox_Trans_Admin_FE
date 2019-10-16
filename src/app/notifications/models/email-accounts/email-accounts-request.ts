export interface IReqAddEmailAccount {
    defaultName: string;
    email: string;
    host: string;
    port: number;
    username: string;
    password: string;
    enableSSL: boolean;
}

export interface IReqUpdateEmailAccount extends IReqAddEmailAccount {
    id: string;
}