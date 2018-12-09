import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../../core/api/base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Package } from '../../models/domain/package';

@Injectable()
export class PackageService extends BaseRestApiService {
    constructor(http: HttpClient, headersService: HeadersManagerService, toastr: ToastrService) {
        super('/api/Package/', http, toastr, headersService);
    }

    getBySerial(serialId: number): Observable<Package[]> {
        return this.get('BySerial', { serialId: serialId });
    }

    getByColor(colorId: number): Observable<Package[]> {
        return this.get('ByColor', { colorId: colorId });
    }

    getByNominal(nominalId: number): Observable<Package[]> {
        return this.get('ByNominal', { nominalId: nominalId });
    }
}
