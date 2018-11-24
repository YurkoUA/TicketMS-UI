import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../../core/api/base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';
import { Observable } from 'rxjs';
import { Serial } from '../../models/domain/serial';

@Injectable()
export class SerialService extends BaseRestApiService {
    constructor(http: HttpClient, headersService: HeadersManagerService) {
        super('/api/Serial/', http, headersService);
    }

    getAll(): Observable<Serial[]> {
        return this.get('List');
    }

    getById(id: number): Observable<Serial> {
        return this.get('Get', { id: id });
    }
}
