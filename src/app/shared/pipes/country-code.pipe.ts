import {Pipe, PipeTransform} from "@angular/core";
import {GeneralService} from "../services/general.service";

@Pipe({
    name: 'CountryCode'
})

export class CountryCodePipe implements PipeTransform {

    constructor(private generalService:GeneralService) {}

    transform(value: any, ...args: any[]): any {
        if(this.generalService.countries !== null) {
            return this.generalService.countries.filter(x => x._id === value).map(x => x.name);
        } else {
            this.generalService.countriesData.subscribe(() => {
                return this.generalService.countries.filter(x => x._id === value).map(x => x.name);
            });
        }
    }

}
