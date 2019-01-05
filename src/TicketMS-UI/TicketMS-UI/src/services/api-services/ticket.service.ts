import { BaseRestApiService } from "../../core/api/base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { HeadersManagerService } from "../../util-services/headers-manager.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Ticket } from "../../models/domain/ticket";
import { Injectable } from "@angular/core";

@Injectable()
export class TicketService extends BaseRestApiService {
    constructor(http: HttpClient, headersService: HeadersManagerService, toastr: ToastrService) {
        super('/api/Ticket/', http, toastr, headersService);
    }

    getByPackage(packageId: number): Observable<Ticket[]> {
        return this.get('ByPackage', { packageId: packageId });
    }
}