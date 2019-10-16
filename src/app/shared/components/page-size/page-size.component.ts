import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({selector: 'app-page-size', templateUrl: './page-size.component.html'})

export class PageSizeComponent {

    @Input() totalCount;
    @Input() pagination;
    @Input() selectedPage;
    @Input() currentPaginationSelected: number;
    @Input() pageNumbers;
    @Output() changeSize = new EventEmitter<string>();
    @Output() changePage = new EventEmitter<string>();

    constructor() {}

    public changeSizeClick(value) {
        this.changeSize.emit(value);
    }

    public pagingClick(value) {
        this.changePage.emit(value);
    }

}
