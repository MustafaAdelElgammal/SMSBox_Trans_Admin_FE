import { Component, OnInit } from '@angular/core';
import {IReqNetworksSearchQuery, IResGetNetworks} from "../../models/ReqNetworksSearchQuery";
import {NetworksService} from "../../services/network.service";
import {BaseListView} from "shared/BaseListView";
import {GeneralService} from "shared/services/general.service";
import {ICountry} from "shared/models/ICountry";
import {INetwork} from "../../models/INetwork";

@Component({
    selector: 'app-networks-page',
    templateUrl: './networks-page.component.html'
})
export class NetworksPageComponent extends BaseListView implements OnInit {

    public countries: ICountry[] = [{_id:'', name:'All Countries'}] ;
    public selectedCountry = '';
    public networks:INetwork[] = [];
    public query: IReqNetworksSearchQuery ;

    constructor(
        private generalService:GeneralService,
        private networksService: NetworksService) {
        super({page: '1', size: '10', name:'', company:'', countryId: '', prefixe: '', carrierCode: ''});
    }

    ngOnInit() {
        if(this.generalService.countries !== null) {
            this.countries = this.countries.concat(this.generalService.countries);
        } else {
            this.generalService.countriesData.subscribe(data => {
                this.countries = this.countries.concat(data);
            });
        }
        this.callHttp();
    }

    callHttp(): void {
        this.hideTable();
        this.networksService.getNetworks(this.query).subscribe(
            (res: IResGetNetworks) => {
                this.networks = res.data;
                this.showTable(res, this.networks.length);
            },
            error => {this.onHttpError(error);}
        );
    }

    setQuery(values): void {
        this.query.page = '1';
        this.query.name = values.name || '';
        this.query.company = values.company || '';
        this.query.countryId = values.countryId || '';
        this.query.carrierCode = values.carrierCode || '';
        this.query.prefixe = values.prefixes || '';
    }
}
