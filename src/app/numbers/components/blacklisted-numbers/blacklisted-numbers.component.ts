import { Component, OnInit } from '@angular/core';
import { BaseListView } from 'shared/BaseListView';
import { ActivatedRoute } from "@angular/router";
import {
  BlacklistedNumberService,
  IReqBlackListSearchQuery,
  IResGetBlackListedNumbers,
  IReqAddBlackListedNumber
} from 'app/numbers/services/blacklistedNumber.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmService } from 'shared/services/confirm.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-blacklisted-numbers',
  templateUrl: './blacklisted-numbers.component.html'
})
export class BlacklistedNumbersComponent extends BaseListView implements OnInit {

  public blacklistedNumbers = [];
  public query: IReqBlackListSearchQuery;
  filterForm: FormGroup;
  public hasAddNumber = false;
  public deleteReq: IReqAddBlackListedNumber = { number: null, details: null };

  constructor(
    private blacklistedNumberService: BlacklistedNumberService,
    private route: ActivatedRoute,
    private confirmService: ConfirmService,
    private toastr: ToastrService
  ) {
    super({
      page: '1',
      size: '10',
      number: ''
    });
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['add']) {
      this.hasAddNumber = true;
    }
    this.callHttp();
    this.filterForm = new FormGroup({
      'number': new FormControl('')
    });
  }
  resetFilterForm(f) {
      f.reset();
      this.resetQuery();
      this.callHttp();
  }
  callHttp(): void {
    this.hideTable();
    this.blacklistedNumberService.getBlackListedNumbers(this.query).subscribe(
      (res: IResGetBlackListedNumbers) => {
        this.blacklistedNumbers = res.data;
        this.showTable(res, this.blacklistedNumbers.length);
      },
      error => { this.onHttpError(error); }
    );
  }

  setQuery(values): void {
    this.query.page = '1';
    this.query.number = this.filterForm.value.number == null ? '' : this.filterForm.value.number;
  }

  onDelete(number): void {
    this.deleteReq.number = +number;

    this.confirmService.confirm({ title: 'Confirm deletion', message: 'Do you really want to delete this number?' }).then(
      (details) => {
        this.deleteReq.details = details;
        this.blacklistedNumberService.deleteBlackListedNumber(this.deleteReq).subscribe(
          () => {
            const index = this.blacklistedNumbers.findIndex(a => a.number === this.deleteReq.number);
            this.blacklistedNumbers.splice(index, 1);
            this.toastr.success(`Black Listed Number has been deleted successfully`, 'Done');
          },
          error => { this.onHttpError(error); }
        );
      },
      () => { return; }
    );
  }

}
