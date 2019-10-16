import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-sort-element',
    templateUrl: './sort-element.component.html'
})
export class SortElementComponent implements AfterViewInit  , OnDestroy {

    @Input() sortByList: string[];

    @Output() onSortByChange = new EventEmitter<string>();
    @Output() onSortTypeChange = new EventEmitter<string>();

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        $(this.el.nativeElement).find('.selectpicker').selectpicker();
    }
    ngOnDestroy(): void {
        $(this.el.nativeElement).find('#sort-by-parent').remove();
        $(this.el.nativeElement).find('.selectpicker').selectpicker("removeDiv");
    }
    sortByChange(value) {
        this.onSortByChange.emit(value);
    }
    sortTypeChange(value) {
        this.onSortTypeChange.emit(value);
    }
}
