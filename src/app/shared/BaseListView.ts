import {FormControl} from "@angular/forms";
import {ElementRef} from "@angular/core";

export abstract class BaseListView {

    public countries = null;
    public displayLoader = 'block';
    public displayTable = 'none';
    public notFound = false;
    public size = '10';
    public currentPageSelected = 1;
    public pageNumbers;
    public query;
    public totalCount = 0;
    public pagination = [{value: 10, name: '10'}, {value: 15, name: '15'}, {value: 20, name: '20'}, {value: 25, name: '25'}];
    public selectedPage = 10;

    abstract callHttp(): void;
    abstract setQuery(values): void;
    public resetQuery() {
        Object.keys(this.query).forEach((property) => {
            if (property === 'size' || property === 'sortBy' || property === 'sortValue') {
                return;
            } else if (property === 'page') {
                this.query[property] = '1';
            } else {
                this.query[property] = '';
            }
        });
    }

    resetFilterForm(f) {
        Object.keys(f.form.controls).forEach((control) => {
            f.form.controls[control].setValue('');
        });
        this.resetQuery();
        this.callHttp();
    }

    protected constructor (query) {
        this.query = query;
    }

    public onPageChange(i) {
        this.query.page = i;
        this.callHttp();
    }

    public onSizeChange(value) {
        this.pageNumbers = 0;
        this.query.size = value;
        this.query.page = '1';
        this.callHttp();
    }

    public showTable(res, length) {
        if(res !== null) {
            this.totalCount = +res.total;
            this.notFound = length <= 0;
            this.displayLoader = 'none';
            this.displayTable = 'table';
            this.selectedPage = +this.query.size;
            this.currentPageSelected = 1;
            this.pageNumbers = res.pagesCount;
        }
    }

    public hideTable() {
        const el = document.getElementById('scroll-to-here')  as HTMLElement;
        // if(el !== null) {
        //   el.scrollIntoView({ behavior: 'smooth' });
        // }
        this.displayLoader = 'block';
        this.displayTable = 'none';
    }

    public submitFilter(values) {
        this.pageNumbers = 0;
        this.query.page = '1';
        this.setQuery(values);
        this.callHttp();
    }

    public onHttpError(error) {
        this.displayLoader = 'none';
        this.notFound = true;
        this.showTable(null, null);
    }

}
