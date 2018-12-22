import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../../core/api/base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';
import { Color } from '../../models/domain/color';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Identifier } from '../../models/identifier.model';
import { ColorCreateModel } from '../../models/color-create.model';
import { NameValueModel } from '../../models/name-value.model';
import { INameValuesService } from '../interfaces/name-values-service-interface';

@Injectable()
export class ColorService extends BaseRestApiService implements INameValuesService<number> {
    constructor(http: HttpClient, headersService: HeadersManagerService, toastr: ToastrService) {
        super('/api/Color/', http, toastr, headersService);
    }

    getAll(): Observable<Color[]> {
        return this.get('List');
    }

    getItems(): Observable<NameValueModel<number>[]> {
        return this.get('NameValues');
    }

    getById(id: number): Observable<Color> {
        return this.get('Get', { id: id });
    }

    createColor(color: ColorCreateModel): Observable<Identifier> {
        return this.post('', color);
    }

    editColor(color: ColorCreateModel): Observable<boolean> {
        return this.put('', color, { id: color.Id });
    }

    deleteColor(id: number): Observable<boolean> {
        return this.delete('', { id: id });
    }
}
