import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-form-tail',
  templateUrl: './filter-form-tail.component.html'
})
export class FilterFormTailComponent implements OnInit {

    @Output() onReset = new EventEmitter();
    constructor() { }

    ngOnInit() {}

    onResetClick() {
        this.onReset.emit();
    }
}
