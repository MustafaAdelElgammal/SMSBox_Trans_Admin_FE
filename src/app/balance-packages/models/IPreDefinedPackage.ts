export interface IPreDefinedPackage {
    _id: string;
    name: string;
}

export interface IPreDefinedPackagePage {
    _id: string;
    name: string;
    expirationInMonths: number;
    amount: number;
    limitedToCountryId: string;
    createdOn: Date;
    active: boolean;
    usedCount: number;
}

export interface IPreDefinedPackageOne {
    _id: string;
    name: string;
    expirationInMonths: number;
    amount: number;
    limitedToCountryId: string;
    createdOn: Date;
    active: boolean;
    usedCount: number;
    pointPrice: number;
    networkPrices: INetworkPrice[];
}

export interface INetworkPrice {
    _id: string;
    networkId: string;
    price: number;
    type: number;
}
