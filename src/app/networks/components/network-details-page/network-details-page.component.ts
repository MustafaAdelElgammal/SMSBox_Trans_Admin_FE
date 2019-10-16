import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {NetworksService} from "../../services/network.service";
import {INetworkDetails} from "../../models/INetworkDetails";
import {IReqUpdateNetwork} from "../../models/ReqUpdateNetwork";
import {ICountry} from "shared/models/ICountry";
import {GeneralService} from "shared/services/general.service";
import {ConfirmService} from "shared/services/confirm.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-network-details-page',
    templateUrl: './network-details-page.component.html'
})

export class NetworkDetailsPageComponent implements OnInit {

    public countries: ICountry[];
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
    public errorMessage = null;
    public successMessage = null;
    public isSubmitClick = false;

    private _id: string;
    public nameV: string;
    public companyV: string;


    constructor(private generalService: GeneralService,
                private networksService: NetworksService,
                private router: Router,
                private confirmService: ConfirmService,
                private route: ActivatedRoute,
                private toastr: ToastrService
    ) {}

    ngOnInit() {
        if (this.generalService.countries) {
            this.countries = this.generalService.countries;
            this.getNetWorkById();
        } else {
            this.generalService.countriesData.subscribe(data => {
                this.countries = data;
                this.getNetWorkById();
            });
        }
    }

    getNetWorkById() {
        this._id = this.route.snapshot.params['id'];
        this.networksService.getNetworkById(this._id).subscribe(
            (networkDetails: INetworkDetails) => {
                this.nameV = networkDetails.name;
                this.companyV = networkDetails.company;
                this.selectedCountry = networkDetails.countryId;
                this.prefixesValues = networkDetails.prefixes.map(String);
                this.carrierCodesValues = networkDetails.carrierCodes.map(String);
                this.fullNumberLengthValues = networkDetails.fullNumberLength.map(String);
            }
        );
    }

    public submit(form, reqUpdateNetwork: IReqUpdateNetwork) {
        this.isSubmitClick = true;
        this.successMessage = null;
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
            || reqUpdateNetwork.countryId === undefined)) {
          this.addNetworkError = true;
          this.isSubmitClick = false;
          return;
        }
        reqUpdateNetwork.prefixes = reqUpdateNetwork.prefixes.map(Number);
        reqUpdateNetwork.carrierCodes = reqUpdateNetwork.carrierCodes.map(Number);
        reqUpdateNetwork.fullNumberLength = reqUpdateNetwork.fullNumberLength.map(Number);
        reqUpdateNetwork.networkId = this._id;

        this.networksService.updateNetwork(reqUpdateNetwork).subscribe(
            () => {
                this.toastr.success(`${this.nameV} network has been updated successfully`, 'Done');

                this.successMessage = `${this.nameV} network has been updated successfully`;
                this.isSubmitClick = false;
            },
            error => {
                if(error.status === 409) {
                    this.addNetworkError = true;
                    this.uniqueError = error.error;
                    this.toastr.error(error.error, 'Error');
                    this.isSubmitClick = false;
                } else {
                    this.toastr.error(error.error.message, 'Error');
                    this.errorMessage = error.error;
                    this.addNetworkError = true;
                    this.isSubmitClick = false;
                }
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
