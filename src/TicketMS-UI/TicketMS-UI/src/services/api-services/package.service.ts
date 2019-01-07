import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../../core/api/base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Package } from '../../models/domain/package';
import { PackagesGetListModel } from '../../models/packages-get-list.model';
import { PagingResponseModel } from '../../models/paging-response.model';
import { PackagesTotalModel } from '../../models/packages-total.model';
import { PackageCreateModel } from '../../models/package-create.model';
import { Identifier } from '../../models/identifier.model';
import { PackageSpecialCreateModel } from '../../models/package-special-create.model';

@Injectable()
export class PackageService extends BaseRestApiService {
    constructor(http: HttpClient, headersService: HeadersManagerService, toastr: ToastrService) {
        super('/api/Package/', http, toastr, headersService);
    }

    getPackages(model: PackagesGetListModel): Observable<PagingResponseModel<Package>> {
        return this.get('List', model);
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

    countPackages(): Observable<PackagesTotalModel> {
        return this.get('Count');
    }

    getById(id: number): Observable<Package> {
        return this.get('Get', { id: id });
    }

    findPackage(name: string): Observable<Package[]> {
        return this.get('Find', { Expression: name });
    }

    createPackage(packageModel: PackageCreateModel): Observable<Identifier> {
        return this.post('', packageModel);
    }

    createSpecialPackage(packageModel: PackageSpecialCreateModel): Observable<Identifier> {
        return this.post('Special', packageModel);
    }

    editPackage(packageModel: PackageCreateModel): Observable<boolean> {
        return this.put('', packageModel, { id: packageModel.Id });
    }

    editSpecialPackage(packageModel: PackageSpecialCreateModel): Observable<boolean> {
        return this.put('Special', packageModel, { id: packageModel.Id });
    }

    deletePackage(id: number): Observable<boolean> {
        return this.delete('', { id: id });
    }
}
