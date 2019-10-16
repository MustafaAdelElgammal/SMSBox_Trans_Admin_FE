import {Pipe, PipeTransform} from "@angular/core";
import {GeneralService} from "../services/general.service";

@Pipe({
    name: 'NetworkCode'
})

export class NetworkCodePipe implements PipeTransform {

    constructor(private generalService:GeneralService) {}

    transform(value: any, ...args: any[]): any {
        if(this.generalService.networks !== null) {
            return this.generalService.networks.filter(x => x._id === value).map(x => x.name);
        } else {
            this.generalService.networksData.subscribe(() => {
                return this.generalService.networks.filter(x => x._id === value).map(x => x.name);
            });
        }
    }

}
