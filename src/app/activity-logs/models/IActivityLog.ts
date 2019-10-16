export interface IActivityLog {
    _id: string;
    userId: string;
    email: string;
    activity: number;
    createdOn: Date;
    details?: string;
}
