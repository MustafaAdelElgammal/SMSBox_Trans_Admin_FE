import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IReqNetworksSearchQuery, IResGetNetworks} from "../models/ReqNetworksSearchQuery";
import {INetworkDetails} from "../models/INetworkDetails";
import {IReqCreateNetwork} from "../models/ReqCreateNetwork";
import {IReqUpdateNetwork} from "../models/ReqUpdateNetwork";

@Injectable({ providedIn: 'root' })

export class NetworksService {

    constructor(private http: HttpClient) { }

    public getNetworks(query: IReqNetworksSearchQuery) {
        const params = new HttpParams()
            .set('page', query.page)
            .set('size', query.size)
            .set('name', query.name)
            .set('company', query.company)
            .set('countryId', query.countryId)
            .set('prefixe', query.prefixe)
            .set('carrierCode', query.carrierCode);
        return this.http.get<IResGetNetworks>('api/networks', { params: params });
    }

    public getNetworkById(id: string) {
        return this.http.get<INetworkDetails>(`api/networks/networkId/${id}`);
    }

    public createNetwork(data: IReqCreateNetwork) {
        return this.http.post('api/networks', data);
    }

    public updateNetwork(data: IReqUpdateNetwork) {
        return this.http.put('api/networks', data);
    }

}
