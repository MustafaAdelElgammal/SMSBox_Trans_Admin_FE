import { PortedNumberService, IReqAddPortedNumber } from '../../services/portedNumber.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { GeneralService} from 'shared/services/general.service';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-ported-numbers-create',
    templateUrl: './ported-numbers-create.component.html'
})
export class PortedNumbersCreateComponent implements OnInit {

    public submitted = false;
    public createPortedNumberForm: FormGroup;
    public errorMessage = '';
    public successMessage = '';
    public data;
    public values: IReqAddPortedNumber = { details: null, number: null, portedToNetworkId: null };
    constructor(private generalService: GeneralService,
                private portedNumberService: PortedNumberService,
                private toastr: ToastrService) { }

  ngOnInit() {
      this.createPortedNumberForm = new FormGroup({
          'number': new FormControl('', [Validators.required]),
          'details': new FormControl('', [Validators.required, Validators.maxLength(1000)]),
          'portedToNetworkId': new FormControl(null, [Validators.required])
      });
  }

  onSubmit() {
      this.data = null;
      this.submitted = true;
      if (this.createPortedNumberForm.invalid) {
        this.errorMessage = 'Please insert valid data';
        this.submitted = false;
        return;
      }

      this.values.number = +this.createPortedNumberForm.controls.number.value;
      this.values.portedToNetworkId = this.createPortedNumberForm.controls.portedToNetworkId.value;
      this.values.details = this.createPortedNumberForm.controls.details.value;
      this.callHttp(this.values);
  }

  callHttp(values) {
      this.submitted = false;
      this.portedNumberService.addPortedNumber(values).subscribe(
          () => {
              this.successMessage = 'Ported Number has been created successfully';
              this.toastr.success(`Ported Number has been created successfully`, 'Done');
              this.resetFormValues();
          },
          (error) => {
              this.submitted = false;
              this.toastr.error(error.error, 'Error');
          }
      );
  }

  resetFormValues() {
      this.createPortedNumberForm.controls.number.reset();
      this.createPortedNumberForm.controls.portedToNetworkId.reset();
      this.createPortedNumberForm.controls.details.reset();
  }
}
