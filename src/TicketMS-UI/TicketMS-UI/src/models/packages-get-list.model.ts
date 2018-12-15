import { PagingModel } from "./paging.model";

export class PackagesGetListModel extends PagingModel {
    constructor(public OnlySpecial: boolean, public OnlyOpened: boolean) {
        super();
    }
}