import { Component, OnInit, Injector } from '@angular/core';
import { Package } from '../../../../models/domain/package';
import { BaseModal } from '../../base-modal';
import { Table } from '../../../../controls/table/models/table.model';

@Component({
    selector: 'app-packages-list-modal',
    templateUrl: './packages-list-modal.component.html'
})
export class PackagesListModalComponent extends BaseModal implements OnInit {
    packagesList: Package[] = [];
    title: string;
    tableOptions: Table<Package>;

    constructor(injector: Injector) {
        super(injector);
    }
    
    ngOnInit(): void {
        this.initializeTable();
    }
    
    initializeTable(): void {
        this.tableOptions = {
            items: this.packagesList,
            headerText: 'Список пачок',
            styles: {
                size: 'sm',
                isHover: true,
                isBordered: true,
                isResponsive: true
            },
            columns: [{
                title: 'ID',
                property: 'Id'
            }, {
                title: 'Назва',
                property: 'Name'
            }, {
                title: 'Квитків',
                property: 'TicketsCount'
            }, {
                title: 'Статус',
                computedProperty: (p: Package) => {
                    return `${p.IsOpened ? 'Відкрита' : 'Закрита'} / ${p.IsSpecial ? 'Спеціальна' : 'Звичайна'}`;
                }
            }]
        };
    }
}
