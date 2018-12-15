import { PAGE_SIZE } from "./constants";

export class PagingModel {
    Offset: number = 0;
    Take: number = PAGE_SIZE;
}