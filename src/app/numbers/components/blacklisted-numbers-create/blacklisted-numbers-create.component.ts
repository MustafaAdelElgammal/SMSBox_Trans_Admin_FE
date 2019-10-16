import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlacklistedNumberService, IReqAddBlackListedNumber } from 'app/numbers/services/blacklistedNumber.service';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-blacklisted-numbers-create',
  templateUrl: './blacklisted-numbers-create.component.html'
})
export class BlacklistedNumbersCreateComponent implements OnInit {

  public isSubmitClick: boolean;
  public createBlacklistForm: FormGroup;
  public errorMessage = '';
  public numberUniqueError = null;

  constructor(
    private blacklistService: BlacklistedNumberService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.createBlacklistForm = new FormGroup({
      'number': new FormControl(null, [Validators.required]),
      'details': new FormControl(null, [Validators.required, Validators.maxLength(1000)])
    });
  }

  onSubmit() {

    this.errorMessage = '';
    this.numberUniqueError = null;

    if (!this.createBlacklistForm.valid) {
      this.errorMessage = 'Please insert valid data';
      return;
    }
    this.isSubmitClick = true;
    this.createBlacklistForm.value.number = +this.createBlacklistForm.value.number;
    const reqCreateBlacklist = <IReqAddBlackListedNumber>this.createBlacklistForm.value;
    this.blacklistService.addBlackListedNumber(reqCreateBlacklist).subscribe(
      (res) => {
        this.router.navigate(['/admin/numbers/black-numbers/list']).then(() => {
          this.toastr.success(`BlackListedNumber has been created successfully`, 'Done');
        }).catch();
      },
      error => {
        this.isSubmitClick = false;
        if (error.status === 409) {
          this.numberUniqueError = error.error;
          this.toastr.error(error.error, 'Error');
        } else {
          this.errorMessage = error.error;
          this.toastr.error(error.error.message, 'Error');
        }
      }
    );

  }

}
