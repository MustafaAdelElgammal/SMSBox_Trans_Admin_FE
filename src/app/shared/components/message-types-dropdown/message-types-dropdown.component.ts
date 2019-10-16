import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'shared/services/general.service';
import { FormGroup } from '@angular/forms';
import { IMessageType } from 'shared/models/IMessageType';

@Component({
  selector: 'app-message-types-dropdown',
  templateUrl: './message-types-dropdown.component.html'
})
export class MessageTypesDropdownComponent implements OnInit {

  @Input() inputFormName: string;
  @Input() placeHolder: string;
  @Input() tabNumber: number;
  @Input() hasError = false;
  @Input() label: string;
  @Input() isRequired = false;
  @Input() parentForm:FormGroup;

  public messageTypes: IMessageType[];

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.getAllMessageTypes().subscribe(data => {
      this.messageTypes = data;
    });
  }

}