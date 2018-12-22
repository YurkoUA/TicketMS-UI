import { BaseRestApiService } from "../../core/api/base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { HeadersManagerService } from "../../util-services/headers-manager.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { NameValueModel } from "../../models/name-value.model";
import { INameValuesService } from "../interfaces/name-values-service-interface";
import { Injectable } from "@angular/core";

@Injectable()
export class NominalService extends BaseRestApiService implements INameValuesService<number> {
    constructor(http: HttpClient, headersService: HeadersManagerService, toastr: ToastrService) {
        super('/api/Nominal/', http, toastr, headersService);
    }

    getItems(): Observable<NameValueModel<number>[]> {
        return this.get('NameValues');
    }
}