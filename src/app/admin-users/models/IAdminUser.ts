export interface IAdminUser {
    _id: string;
    email: string;
    name: string;
    createdOn: Date;
    active: boolean;
    roles: string[];
}

export interface IAdminUserOne {
    _id: string;
    email: string;
    name: string;
    createdOn: Date;
    active: boolean;
    roles: string[];
    createdById: string;
}


