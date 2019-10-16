import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "shared/services/general.service";
import {ICountry} from "shared/models/ICountry";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-countries-dropdown',
  templateUrl: './countries-dropdown.component.html'
})
export class CountriesDropdownComponent implements OnInit {

    @Input() inputFormName:string;
    @Input() placeHolder:string;
    @Input() tabNumber:number;
    @Input() hasError =false;
    @Input() isRequired = false;
    @Input() label:string;
    @Input() parentForm:FormGroup;

    public countries: ICountry[] = [{_id:'', name:'All Countries'}] ;

    constructor(private generalService:GeneralService) { }

    ngOnInit() {
        if(this.generalService.countries !== null) {
            this.countries = this.countries.concat(this.generalService.countries);
        } else {
          this.generalService.countriesData.subscribe(data => {
            this.countries = this.countries.concat(data);
          });
        }
    }

}
