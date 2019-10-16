import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IReqCreatePackage, PreDefinedPackageService} from "../../services/preDefinedPackage.service";
import {GeneralService} from "shared/services/general.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-balance-packages-create',
    templateUrl: './balance-packages-create.component.html'
})
export class BalancePackagesCreateComponent implements OnInit {

    public fieldArray: Array<any> = [];
    public packageNameUniqueError = null;
    public isSubmitClick: boolean;
    public createPackageForm: FormGroup;
    public errorMessage = '';
    public types = [];

    constructor(
        private generalService:GeneralService,
        private packagesService: PreDefinedPackageService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.createPackageForm = new FormGroup({
          'name': new FormControl(null, [Validators.required]),
          'limitedToCountryId': new FormControl(null, [Validators.required]),
          'expirationInMonths': new FormControl([], [Validators.required]),
          'amount': new FormControl([], [Validators.required]),
          'pointPrice': new FormControl([]),
          'networkPrices':new FormArray([])
        });
    }
    onSubmit() {
        this.errorMessage = '';
        this.packageNameUniqueError = null;
        if(!this.createPackageForm.valid) {
            this.errorMessage = 'True';
            return;
        }
        this.isSubmitClick = true;
        this.createPackageForm.value.expirationInMonths = +this.createPackageForm.value.expirationInMonths;
        this.createPackageForm.value.amount = +this.createPackageForm.value.amount;
        this.createPackageForm.value.pointPrice = +this.createPackageForm.value.pointPrice;

        const arr = this.createPackageForm.value.networkPrices.map(obj => ({
            networkId: obj.networkId,
            price: +obj.price,
            type: +obj.type
        }));
        this.createPackageForm.value.networkPrices = JSON.parse(JSON.stringify(arr));
        const reqCreatePackage = <IReqCreatePackage> this.createPackageForm.value;
        this.packagesService.createPreDefinedPackage(reqCreatePackage).subscribe(
            () => {
                this.router.navigate(['/admin/balance_package/list']).then(() => {
                  this.toastr.success(`Package has been created successfully`, 'Done');
                }).catch();
            },
            error => {
                this.isSubmitClick = false;
                if(error.status === 409) {
                    this.packageNameUniqueError = error.error;
                    this.toastr.error(error.error, 'Error');
                } else {
                    this.errorMessage = error.error;
                    this.toastr.error(error.error.message, 'Error');
                }
            }
        );

    }

    addNetworkGroup() {
      const formGroup:FormGroup = new FormGroup({
        'networkId': new FormControl(null, [Validators.required]),
        'price': new FormControl(null, [Validators.required]),
        'type': new FormControl(null, [Validators.required])
      });
      (<FormArray>this.createPackageForm.get('networkPrices')).push(formGroup);
    }

    deleteNetworkGroup(index) {
        this.fieldArray.splice(index, 1);
        (<FormArray> this.createPackageForm.get('networkPrices')).removeAt(index);
    }
}
