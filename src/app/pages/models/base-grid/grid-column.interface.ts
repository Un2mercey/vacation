export interface IGridColumn {
    title: string;
    columnName: string;
    width: any;
    sortFn?: Function;
    visible?: boolean;
    disabled?: boolean;
    titleTooltip?: string;
}
