export interface ILog {
    _id: string;
    message: string;
    details?: string;
    logLevel: number;
    app_name: string;
    createdOn: Date;
}
