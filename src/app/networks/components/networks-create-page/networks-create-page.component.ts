import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {NetworksService} from "../../services/network.service";
import {IReqCreateNetwork} from "../../models/ReqCreateNetwork";
import {ICountry} from "shared/models/ICountry";
import {GeneralService} from "shared/services/general.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-networks-create-page',
    templateUrl: './networks-create-page.component.html'
})

export class NetworksCreatePageComponent implements OnInit {

    public countries: ICountry[] ;
    public selectedCountry = null;

    public prefixesValues = [];
    public prefixesValidators = [this.prefixesValidtion];
    public prefixesValidationErrorMessages = {
        'isNumber': 'Please add numbers only',
        'Length': 'prefixe maximum length is 5 characters'
    };

    public fullNumberLengthValues = [];
    public fullNumberLengthValidators = [this.fullNumberLengthValidtion];
    public fullNumberLengthValidationErrorMessages = {
        'isNumber': 'Please add numbers only' ,
        'MinMax': 'Full Number Length should be number between 8 and 12'
    };

    public carrierCodesValues = [];
    public carrierCodesValidators = [this.carrierCodesValidtion];
    public carrierCodesValidationErrorMessages = {
        'isNumber': 'Please add numbers only'
    };

    public addNetworkError = false;
    public uniqueError= null;
    public errorMessage: null;
    public isSubmitClick: boolean;

    constructor(private generalService:GeneralService,
                private networksService:NetworksService,
                private router: Router,
                private toastr: ToastrService
    ) {}

    ngOnInit() {
        if(this.generalService.countries) {
            this.countries = this.generalService.countries;
        } else {
            this.generalService.countriesData.subscribe(data => {
                this.countries = data;
            });
        }
    }

    public create(form, reqCreateNetwork: IReqCreateNetwork) {

        this.isSubmitClick = true;
        this.errorMessage = null;
        this.uniqueError = null;

        if (!form.form.valid) {
          this.addNetworkError = true;
          this.isSubmitClick = false;
          return;
        }

        if (this.prefixesValues.length === 0 ||
            this.fullNumberLengthValues.length === 0
            || (this.selectedCountry == null
              || reqCreateNetwork.countryId === undefined)
        ) {
            this.addNetworkError = true;
            this.isSubmitClick = false;
            return;
        }

        reqCreateNetwork.prefixes = reqCreateNetwork.prefixes.map(Number);
        reqCreateNetwork.carrierCodes = reqCreateNetwork.carrierCodes.map(Number);
        reqCreateNetwork.fullNumberLength = reqCreateNetwork.fullNumberLength.map(Number);

        this.networksService.createNetwork(reqCreateNetwork).subscribe(
            () => {
                this.router.navigate(['/admin/networks/list'], { queryParams: { addNetwork: true } }).then(() => {
                    this.toastr.success(`Network has been created successfully`, 'Done');
                }).catch();
            },
            error => {
                if(error.status === 409) {
                    this.addNetworkError = true;
                    this.uniqueError = error.error;
                    this.toastr.error(error.error, 'Error');
                } else {
                    this.errorMessage = error.error;
                    this.toastr.error(error.error.message, 'Error');
                    this.addNetworkError = true;
                }
                this.isSubmitClick = false;
            }
        );
    }

    private carrierCodesValidtion(control: FormControl) {
        const value  = control.value;
        if (isNaN((value))) {
            return {'isNumber': true};
        }
        return null;
    }

    private prefixesValidtion(control: FormControl) {
        const value  = control.value;
        if (isNaN((value))) {
          return {'isNumber': true};
        }
        if (value.length > 5) {
          return {'Length': true};
        }
        return null;
    }

    private fullNumberLengthValidtion(control: FormControl) {
        const value  = control.value;
        if (isNaN((value))) {
          return {'isNumber': true};
        }
        if(value < 8 || value > 12) {
          return {'MinMax': true};
        }
        return null;
    }
}
