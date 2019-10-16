import {FormGroup} from "@angular/forms";
import {IReqBaseSearchQuery} from "shared/models/IReqBaseSearchQuery";
import {EventEmitter} from "@angular/core";

export abstract class BaseFilterFormView<T extends IReqBaseSearchQuery> {

    public onFilter: EventEmitter<void>;
    public query:T ;
    public filterForm:FormGroup;


    abstract setQuery(): void;
    abstract resetQuery(): void;
    abstract resetForm(): void;

    protected constructor () {}

    submitFilterForm() {
        this.query.page = '1';
        this.setQuery();
        this.onFilter.emit();
    }

    resetFilterForm() {
        this.query.page = '1';
        this.resetQuery();
        this.resetForm();
        this.onFilter.emit();
    }

    dateToString = date => {
        if(date !== null && date !== '') {
            if(Date.parse(date.toDateString())) {
                return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + date.getDate()).slice(-2)}`;
            }
        }
        return '';
    }

}
