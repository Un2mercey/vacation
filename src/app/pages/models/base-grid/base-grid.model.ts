import * as _ from 'underscore';
import * as angular from 'angular';
import { IGridColumn } from './grid-column.interface';

export class BaseGrid {

    public records: Array<any> = [];
    public columns: Array<IGridColumn> = [];
    public notFoundMsg: string = 'Данные не найдены';

    public constructor() {
        this.initEmptyGrid();
    }

    public getColumn = (field: string): IGridColumn => {
        return _.find(this.columns, (column: IGridColumn) => {
            return angular.equals(column.title, field);
        });
    }

    private initEmptyGrid = (): void => {
        this.records = [];
        this.columns = [];
    }
}
