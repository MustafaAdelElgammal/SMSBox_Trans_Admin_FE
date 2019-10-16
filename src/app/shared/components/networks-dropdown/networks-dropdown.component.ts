import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "shared/services/general.service";
import {FormGroup} from "@angular/forms";
import {INetworkAll} from "shared/models/INetworkAll";

@Component({
    selector: 'app-networks-dropdown',
    templateUrl: './networks-dropdown.component.html'
})
export class NetworksDropdownComponent  implements OnInit {

    @Input() inputFormName:string;
    @Input() placeHolder:string;
    @Input() tabNumber:number;
    @Input() hasError =false;
    @Input() label:string ;
    @Input() isRequired = false;
    @Input() parentForm:FormGroup;

    public networks: INetworkAll[] ;

    constructor(private generalService:GeneralService) { }

    ngOnInit() {
        if(this.generalService.networks !== null) {
            this.networks = this.generalService.networks;
        } else {
            this.generalService.networksData.subscribe(data => {
                this.networks = data;
            });
        }
    }

}
