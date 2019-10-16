import {INetwork} from "./INetwork";
import {IResGetListMain} from "shared/models/IResGetListMain";

export interface IReqNetworksSearchQuery {
    page: string;
    size: string;
    name?: string;
    company?: string;
    countryId?: string;
    prefixe?: string;
    carrierCode?: string;
}

export interface IResGetNetworks extends IResGetListMain{
    data: INetwork[];
}
