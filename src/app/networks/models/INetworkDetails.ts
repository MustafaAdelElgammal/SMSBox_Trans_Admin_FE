import {INetwork} from "./INetwork";

export interface INetworkDetails extends INetwork{
    company: string;
    carrierCodes: number[];
    fullNumberLength: number[];
}
