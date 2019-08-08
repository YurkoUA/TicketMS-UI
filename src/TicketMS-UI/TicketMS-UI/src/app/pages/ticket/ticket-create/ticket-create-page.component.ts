import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { BasePage } from '../../base-page';
import { TicketService } from '../../../../services/api-services/ticket.service';
import { SelectListType } from '../../../../models/enums/select-list-type.enum';
import { NgForm } from '@angular/forms';
import { TicketCreateModel } from '../../../../models/ticket-create.model';
import { PackageFilterModel } from '../../../../models/package-filter.model';
import { PackageService } from '../../../../services/api-services/package.service';
import { Package } from '../../../../models/domain/package';
import { ToastrService } from 'ngx-toastr';
import { NominalService } from '../../../../services/api-services/nominal.service';
import { ColorService } from '../../../../services/api-services/color.service';
import { SerialService } from '../../../../services/api-services/serial.service';
import { NameValueModel } from '../../../../models/name-value.model';

@Component({
    selector: 'app-ticket-create-page',
    templateUrl: './ticket-create-page.component.html'
})
export class TicketCreatePageComponent extends BasePage implements OnInit {
    SelectListType = SelectListType;

    @ViewChild('ticketForm') ticketForm: NgForm;

    ticketModel: TicketCreateModel = new TicketCreateModel();
    packagesFilterModel: PackageFilterModel = new PackageFilterModel();

    nominalsList: NameValueModel<number>[] = [];
    colorsList: NameValueModel<number>[] = [];
    seriesList: NameValueModel<number>[] = [];
    packagesList: Package[] = [];
    notesList: string[] = [];

    deleteNote: boolean = true;

    constructor(
        injector: Injector,
        private nominalService: NominalService,
        private colorService: ColorService,
        private serialService: SerialService,
        private packageService: PackageService,
        private ticketService: TicketService,
        private toastr: ToastrService
    ) {
        super(injector);
    }

    get selectedSerialName(): string {
        if (this.seriesList.length == 0) {
            return '';
        }

        let name = this.seriesList
            .filter(s => s.Value == this.ticketModel.SerialId)
            .firstOrDefault().Name;

        return name;
    }

    get notesExist(): boolean {
        return this.notesList.length > 0;
    }

    ngOnInit(): void {
        this.packagesFilterModel.OnlyOpened = true;
        this.loadSelectLists();
    }

    loadSelectLists(): void {
        this.nominalService.getItems()
            .subscribe(n => {
                this.nominalsList = n;

                this.ticketModel.NominalId = this.nominalsList
                    .filter(n => n.IsDefault == true)
                    .firstOrDefault()
                    .Value;
            });

        this.colorService.getItems()
            .subscribe(c => {
                this.colorsList = c;
                this.ticketModel.ColorId = c.firstOrDefault().Value;
            });

        this.serialService.getItems()
            .subscribe(s => {
                this.seriesList = s;
                this.ticketModel.SerialId = s.firstOrDefault().Value;
            });
    }
    
    loadPackages(): void {
        this.packagesFilterModel.NominalId = this.ticketModel.NominalId;
        this.packagesFilterModel.ColorId = this.ticketModel.ColorId;
        this.packagesFilterModel.SerialId = this.ticketModel.SerialId;

        if (this.ticketModel.Number) {
            this.packagesFilterModel.FirstDigit = this.ticketModel.Number.toInteger();
        }

        console.log(this.packagesFilterModel);

        this.packageService.filterPackages(this.packagesFilterModel)
            .subscribe(p => this.packagesList = p);
    }

    createTicket(): void {
        if (this.ticketForm.invalid) {
            return;
        }

        this.saveNote();

        this.ticketService.createTicket(this.ticketModel)
            .subscribe(id => {
                if (id && id.Id) {
                    this.toastr.success(`Квиток з номером №${this.ticketModel.Number} успішно створено!`);
                    this.ticketForm.reset();
                }
            });
    }

    saveNote(): void {
        let note = this.ticketModel.Note;

        if (note && !this.notesList.exists(note)) {
            this.notesList.insert(note, 0);
        }
    }

    putNote(index: number): void {
        if (this.notesList.length >= index + 1) {
            this.ticketModel.Note = this.notesList[index];
        }
    }

    getPackageItemText(p: Package): string {
        let text = p.Name;

        if (p.TicketsCount > 0) {
            text += ` - ${p.TicketsCount} шт.`;
        }

        return text;
    }
}
