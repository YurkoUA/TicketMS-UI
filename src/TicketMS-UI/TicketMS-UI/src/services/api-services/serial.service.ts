import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../../core/api/base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';
import { Observable } from 'rxjs';
import { Serial } from '../../models/domain/serial';
import { SerialCreateModel } from '../../models/serial-create.model';
import { Identifier } from '../../models/identifier.model';

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

    createSerial(serial: SerialCreateModel): Observable<Identifier> {
        return this.post('', serial);
    }

    editSerial(serial: SerialCreateModel): Observable<boolean> {
        return this.put('', serial, { id: serial.Id });
    }

    deleteSerial(id: number): Observable<boolean> {
        return this.delete('', { id: id });
    }
}
