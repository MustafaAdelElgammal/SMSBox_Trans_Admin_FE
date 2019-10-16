import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PortedNumberService } from 'app/numbers/services/portedNumber.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ported-numbers',
  templateUrl: './ported-numbers.component.html'
})
export class PortedNumbersComponent implements OnInit {

    public submitted = false;
    public portedNumberForm: FormGroup;
    public errorMessage = '';
    public data;

  constructor(private portedNumberService: PortedNumberService,
              private toastr: ToastrService) { }

  ngOnInit() {
      this.portedNumberForm = new FormGroup({
          'number': new FormControl('', [Validators.required])
      });
  }

  onSubmit() {

      this.data = null;
      if (this.portedNumberForm.invalid) {
          this.errorMessage = 'true';
          return;
      }
      this.submitted = true;
      const reqGetPortedNumber = +this.portedNumberForm.controls.number.value;
      this.portedNumberService.getPortedNumber(reqGetPortedNumber).subscribe(
          res => {
              this.data = res;
              this.submitted = false;
          },
          error => {
              this.submitted = false;
              this.toastr.error(error.error, 'Error');
          }
      );
  }

}
