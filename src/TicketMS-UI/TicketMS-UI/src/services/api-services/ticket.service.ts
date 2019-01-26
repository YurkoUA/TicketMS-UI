import { BaseRestApiService } from "../../core/api/base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { HeadersManagerService } from "../../util-services/headers-manager.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Ticket } from "../../models/domain/ticket";
import { Injectable } from "@angular/core";
import { PagingModel } from "../../models/paging.model";
import { PagingResponseModel } from "../../models/paging-response.model";

@Injectable()
export class TicketService extends BaseRestApiService {
    constructor(http: HttpClient, headersService: HeadersManagerService, toastr: ToastrService) {
        super('/api/Ticket/', http, toastr, headersService);
    }

    getAllTickets(paging: PagingModel): Observable<PagingResponseModel<Ticket>> {
        return this.get('List', paging);
    }

    getHappyTickets(paging: PagingModel): Observable<PagingResponseModel<Ticket>> {
        return this.get('Happy', paging);
    }

    getUnallocatedTickets(): Observable<Ticket[]> {
        return this.get('Unallocated');
    }

    getReversibleTickets(): Observable<Ticket[]> {
        return this.get('Reversible');
    }

    getConsistentTickets(): Observable<Ticket[]> {
        return this.get('Consistent');
    }

    getDuplicatedTickets(): Observable<Ticket[]> {
        return this.get('Duplicated');
    }

    getByPackage(packageId: number): Observable<Ticket[]> {
        return this.get('ByPackage', { packageId: packageId });
    }
    
    getById(id: number): Observable<Ticket> {
        return this.get('Get', { id: id });
    }
}