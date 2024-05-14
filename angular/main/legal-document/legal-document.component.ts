import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import {
    LegalDocumentDto,
    LegalDocumentServiceProxy,
    FilterLegalDocumentsInput,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import {
    Column,
    MY_DATE_FORMAT,
    defaultCoQuanBanHanhOptions,
    defaultLoaiVanBanOptions,
    defaultNguoiKyOptions,
    legalDocumentColumns,
} from './common';
import { AddLegalDocumentComponent } from './add/add-legal-document.component';
import { LegalDocumentUtilsService } from './utils/legal-document.utils.service';
import { UpdateLegalDocumentComponent } from './update/update-legal-document.component';

@Component({
    selector: 'legal-documents',
    templateUrl: './legal-document.component.html',
    styleUrls: ['./legal-document.component.less'],
    animations: [appModuleAnimation()],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    ],
})
export class LegalDocumentComponent extends AppComponentBase implements OnInit {
    legalDocuments = new MatTableDataSource<LegalDocumentDto>();
    filter: string = '';
    displayedColumns: string[] = ['kyHieu', 'banHanhTuNgay', 'trichYeu', 'coQuanBanHanh'];

    loaiVanBanOptions: string[] = defaultLoaiVanBanOptions;
    nguoiKyOptions: string[] = defaultNguoiKyOptions;
    coQuanBanHanhOptions: string[] = defaultCoQuanBanHanhOptions;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() search = new EventEmitter<any>();
    searchForm: FormGroup;

    constructor(
        injector: Injector,
        private _legalDocumentService: LegalDocumentServiceProxy,
        private _legalDocumentUtilsService: LegalDocumentUtilsService,
        private fb: FormBuilder,
        private _addDialog: MatDialog,
        private _updateDialog: MatDialog
    ) {
        super(injector);
        this.searchForm = this.fb.group({
            loaiVanBan: [''],
            nguoiKy: [''],
            coQuanBanHanh: [''],
            banHanhTuNgay: [''],
            banHanhDenNgay: [''],
            tuKhoaTimKiem: [''],
        });
    }

    ngOnInit(): void {
        this.getLegalDocuments();
    }

    onSubmit() {
        // Emit the search event with the form values
        this.search.emit(this.searchForm.value);

        // Create a new object without empty string fields
        const filteredInput = this.removeEmptyStrings(this.searchForm.value);

        console.log(filteredInput);

        // Call the FilterLegalDocuments method from the service
        this._legalDocumentService
            .filterLegalDocuments(filteredInput as FilterLegalDocumentsInput)
            .subscribe((result) => {
                this.legalDocuments = new MatTableDataSource<LegalDocumentDto>(result.items);
            });
    }

    onRemoveInput(event: Event) {
        this.searchForm.reset();
        this.getLegalDocuments();
        event.stopPropagation();
    }

    getLegalDocuments(): void {
        this._legalDocumentService.getAllLegalDocuments().subscribe((result) => {
            this.legalDocuments = new MatTableDataSource<LegalDocumentDto>(result.items);
        });
    }

    onOpenAddDoc(): void {
        this._addDialog.open(AddLegalDocumentComponent);
    }

    onOpenUpdateDoc(legalDocument: LegalDocumentDto): void {
        this._addDialog.open(UpdateLegalDocumentComponent, {
            data: legalDocument,
        });
    }

    getColumnData(value: string): Column {
        return legalDocumentColumns.find((item) => item.value === value);
    }

    isLoggedIn(): boolean {
        return this._legalDocumentUtilsService.isLoggedIn()
    }

    formatDateTime(dateTime: string): string {
        return this._legalDocumentUtilsService.formatDateTime(dateTime);
    }

    removeEmptyStrings(input: any): any {
        return this._legalDocumentUtilsService.removeEmptyStrings(input);
    }

    clearSelection(controlName: string, event: Event): void {
        this._legalDocumentUtilsService.clearSelection(this.searchForm, controlName, event);
    }
}
