import { Component, OnInit } from '@angular/core';
import {IReqPackageSearchQuery, IResPackagesList, PreDefinedPackageService} from "../../services/preDefinedPackage.service";
import {BaseListView} from "shared/BaseListView";
import {GeneralService} from "shared/services/general.service";
import {ICountry} from "shared/models/ICountry";

@Component({
    selector: 'app-balance-packages-list-page',
    templateUrl: './balance-packages-list-page.component.html'
})
export class BalancePackagesListPageComponent extends BaseListView implements OnInit {

    public packages = [];
    public countries: ICountry[] = [{_id:'', name:'All Countries'}] ;
    public selectedCountry = '';
    public query: IReqPackageSearchQuery;
    public statuses = [
        {value: '', name: 'All', colors: ['u-btn-black']},
        {value: true, name: 'Active', colors: ['g-bg-teal-v2']},
        {value: false, name: 'Inactive', colors: ['g-brd-primary']}
    ];
    public selectedStatuses = this.statuses[0].value;
    public sortingList = [
        {name:'Name', value:'name'},
        {name:'Used Count', value:'usedCount'}
    ];
    constructor(
        private generalService:GeneralService,
        private packageService: PreDefinedPackageService) {
        super({
          page: '1', size: '10',
          name: '', countryId: '',
          amountFrom: '',amountTo: '',
          active: '',createdOnFrom: '',
          createdOnTo: '',sortBy: '',sortValue: ''
        });
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
        this.packageService.getPreDefinedPackagesPaging(this.query).subscribe(
            (res: IResPackagesList) => {
                this.packages = res.data;
                this.showTable(res, this.packages.length);
            },
            error => {this.onHttpError(error);}
        );
    }

    setQuery(values): void {
        this.query.page = '1';
        this.query.name = values.name;
        this.query.countryId = typeof values.countryId !== 'undefined' && values.countryId  !== null ? values.countryId: '';
        this.query.amountFrom = values.amountFrom;
        this.query.amountTo = values.amountTo;
        this.query.active = values.active;

        if(values.createdOn_from !== '') {
            this.query.createdOnFrom = values.createdOn_from;
        } else {
            this.query.createdOnFrom = '';
        }
        if(values.createdOn_to !== '') {
            this.query.createdOnTo = values.createdOn_to;
        } else {
            this.query.createdOnTo = '';
        }

    }
    setSortBy(value) {
        this.query.sortBy = value;
        this.callHttp();
    }
    setSortType(value) {
        this.query.sortValue = value;
        this.callHttp();
    }
}
