import {IReqBaseSearchQuery} from "shared/models/IReqBaseSearchQuery";

export abstract class BaseListView<T extends IReqBaseSearchQuery>  {

    public countries = null;
    public displayLoader = 'block';
    public displayTable = 'none';
    public notFound = false;
    public size = '10';
    public currentPageSelected = 1;
    public pageNumbers;
    protected query:T;
    public totalCount = 0;
    public pagination = [{value: 10, name: '10'}, {value: 15, name: '15'}, {value: 20, name: '20'}, {value: 25, name: '25'}];
    public selectedPage = 10;

    abstract callHttp(): void;

    protected constructor () {
    }

    public onPageChange(i) {
        this.query.page = i;
        this.callHttp();
    }

    public onSizeChange(value) {
        this.query.size = value;
        this.pageNumbers = 0;
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
            this.pageNumbers = res.numberOfPages;
        }
    }

    public hideTable() {
        // const el = document.getElementById('scroll-to-here')  as HTMLElement;
        // el.scrollIntoView({ behavior: 'smooth' });
        this.displayLoader = 'block';
        this.displayTable = 'none';
    }

    public submitFilter() {
        this.pageNumbers = 0;
        this.callHttp();
    }

    public onHttpError(error) {
        this.displayLoader = 'none';
        this.notFound = true;
        this.showTable(null, null);
    }

}
