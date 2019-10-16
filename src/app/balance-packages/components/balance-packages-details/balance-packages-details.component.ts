import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPreDefinedPackageOne} from "../../models/IPreDefinedPackage";
import {PreDefinedPackageService} from "../../services/preDefinedPackage.service";

@Component({
  selector: 'app-balance-packages-details',
  templateUrl: './balance-packages-details.component.html'
})
export class BalancePackagesDetailsComponent implements OnInit {

    public _id: any;
    public currentPackage: IPreDefinedPackageOne;

    constructor(private packageService: PreDefinedPackageService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.getPackageById();
    }

    getPackageById() {
        this._id = this.route.snapshot.params['id'];
        this.packageService.getPreDefinedPackage(this._id).subscribe(
            (packageDetails: IPreDefinedPackageOne) => {
                this.currentPackage = packageDetails;
            }
        );
    }
}
