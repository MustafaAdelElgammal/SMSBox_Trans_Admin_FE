import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'ReplaceUnderscoreWithSpace'
})
export class ReplaceUnderscoreWithSpacePipe implements PipeTransform {

    constructor() {}

    transform(value: any, ...args: any[]): any {
        return value.replace(/_/g, ' ');
    }

}
