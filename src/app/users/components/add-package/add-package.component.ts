import {Component, OnInit} from '@angular/core';
import {IUserOne} from "../../models/IUser";
import {IPreDefinedPackage} from "../../../balance-packages/models/IPreDefinedPackage";
import {IReqAddPackageToUser, UsersService} from "../../services/users.service";
import {PreDefinedPackageService} from "../../../balance-packages/services/preDefinedPackage.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-add-package',
    templateUrl: './add-package.component.html'
})

export class AddPackageComponent implements OnInit {
    errorMessage = null;
    showSectionTow ;
    selectedUser: IUserOne = null;
    isFindUserClick = false;
    isAddPackageClick = false;
    isAddPackageError = false;
    addPackageErrorMessage = null;
    addPackageSuccessfully = null;
    packageIdRequired = false;
    public packages: IPreDefinedPackage[];
    selectedPackage = null;
    phoneNumberControle = null;
    emailControle = null;


    constructor(
        private userService: UsersService,
        private preDefinedPackageService: PreDefinedPackageService,
        private toastr: ToastrService) {}

    ngOnInit() {
        this.preDefinedPackageService.getAllPreDefinedPackages().subscribe(
            (res:IPreDefinedPackage[]) => {
                this.packages = res;
            }
        );
    }

    findUser(form) {
        this.emailControle = form.form.controls['email'];
        this.phoneNumberControle = form.form.controls['phoneNumber'];

        this.errorMessage = null;
        this.showSectionTow = false;
        this.isFindUserClick = true;
        if (!form.form.valid || (form.value.email === '' && form.value.phoneNumber === '')) {
            this.toastr.error('Please Type email or/and Phone Number', 'Error');
            this.isFindUserClick = false;
            return;
        }
        this.userService.getUser({email: form.value.email, phoneNumber: form.value.phoneNumber}).subscribe(
            (res: IUserOne) => {
                this.selectedUser= res;
                this.isFindUserClick = false;
                if(this.selectedUser.active === true) {
                    this.showSectionTow = true;
                 }
            },
            (error) => {
                if(error.status === 404) {
                      this.toastr.error('Can\'t find any matching user', 'Error');
                } else {
                    this.errorMessage = error.error;
                    this.toastr.error(error.error, 'Error');
                }
                this.isFindUserClick = false;
            }
        );
    }

    onResetClick() {
        this.emailControle.setValue('');
        this.phoneNumberControle.setValue('');
        this.showSectionTow = false;
        this.selectedUser= null;
    }

    addPackageToUser(form) {
        this.isAddPackageClick = true;
        this.isAddPackageError = false;
        this.addPackageSuccessfully = null;

        if (!form.form.valid || (form.value.packageId === null ||  form.value.available === '')) {
            this.packageIdRequired = form.value.packageId === null;
            this.isAddPackageError = true;
            this.isAddPackageClick = false;
            return;
        }
        this.packageIdRequired = false;
        const data: IReqAddPackageToUser = {
            available: (+form.value.available != null) ? +form.value.available : 0 ,
            packageId: form.value.packageId,
            userId:this.selectedUser._id
        };
        this.userService.addPackageToUser(data).subscribe(
            () => {
                this.isAddPackageClick = false;
                this.addPackageErrorMessage = null;
                this.emailControle.setValue('');
                this.phoneNumberControle.setValue('');
                this.toastr.success(`Package has been added to user ${this.selectedUser.email} successfully`, 'Done');
            },
            error => {
                this.toastr.error(error.error, 'Error');
                this.isAddPackageClick = false;
                this.isAddPackageError = true;
            }
        );
    }

    resetData() {
        this.emailControle.setValue('');
        this.phoneNumberControle.setValue('');
        this.selectedUser= null;
        this.showSectionTow = false;
        this.errorMessage= null;
        this.isAddPackageClick = false;
        this.addPackageSuccessfully = null;
        this.isAddPackageError = false;
        this.addPackageErrorMessage = null;
        this.packageIdRequired = false;
        this.selectedPackage = null;
    }

}
