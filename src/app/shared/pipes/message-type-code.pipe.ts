import {Pipe, PipeTransform} from "@angular/core";
import {GeneralService} from "../services/general.service";

@Pipe({
    name: 'MessageTypeCode'
})

export class MessageTypeCodePipe implements PipeTransform {

    constructor(private generalService:GeneralService) {}

    transform(value: any, ...args: any[]): any {
        if(this.generalService.messageTypes !== null) {
            return Promise.resolve(
                this.generalService.messageTypes
                    .filter(x => x.num === value)
                    .map(x => x.name.replace(/_/g, ' '))
            );
        } else {
            this.generalService.messageTypesData.subscribe(() => {
                return Promise.resolve(
                  this.generalService.messageTypes
                      .filter(x => x.num === value)
                      .map(x => x.name.replace(/_/g, ' '))
                );
            });
        }
    }

}
