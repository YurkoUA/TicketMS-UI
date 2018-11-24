import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../../core/api/base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';
import { Color } from '../../models/domain/color';
import { Observable } from 'rxjs';

@Injectable()
export class ColorService extends BaseRestApiService {
    constructor(http: HttpClient, headersService: HeadersManagerService) {
        super('/api/Color/', http, headersService);
    }

    getAll(): Observable<Color[]> {
        return this.get('List');
    }

    getById(id: number): Observable<Color> {
        return this.get('Get', { id: id });
    }
}
