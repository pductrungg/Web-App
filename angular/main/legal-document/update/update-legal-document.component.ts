import { DateTime } from 'luxon';
import { Component, EventEmitter, Inject, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { LegalDocumentServiceProxy, LegalDocumentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
    MY_DATE_FORMAT,
    defaultCoQuanBanHanhOptions,
    defaultDoKhanOptions,
    defaultDoMatOptions,
    defaultDonViSoanThaoOptions,
    defaultLoaiVanBanOptions,
    defaultNguoiKyOptions,
} from '../common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LegalDocumentUtilsService } from '../utils/legal-document.utils.service';

@Component({
    selector: 'update-legal-documents',
    templateUrl: './update-legal-document.component.html',
    styleUrls: ['../legal-document.component.less'],
    animations: [appModuleAnimation()],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    ],
})
export class UpdateLegalDocumentComponent extends AppComponentBase implements OnInit {
    loaiVanBanOptions: string[] = defaultLoaiVanBanOptions;
    nguoiKyOptions: string[] = defaultNguoiKyOptions;
    coQuanBanHanhOptions: string[] = defaultCoQuanBanHanhOptions;
    doKhanOptions: string[] = defaultDoKhanOptions;
    doMatOptions: string[] = defaultDoMatOptions;
    donViSoanThaoOptions: string[] = defaultDonViSoanThaoOptions;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() update = new EventEmitter<any>();
    updateForm: FormGroup;

    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) public data: LegalDocumentDto, // Inject MAT_DIALOG_DATA to get the data
        private _legalDocumentService: LegalDocumentServiceProxy,
        private _legalDocumentUtilsService: LegalDocumentUtilsService,
        private fb: FormBuilder,
        private _dialogRef: MatDialogRef<UpdateLegalDocumentComponent>,
        private _router: Router
    ) {
        super(injector);
        this.updateForm = this.fb.group({
            loaiVanBan: [data?.loaiVanBan || '', Validators.required], // Use default value if data is not provided
            nguoiKy: [data?.nguoiKy || '', Validators.required],
            coQuanBanHanh: [data?.coQuanBanHanh || '', Validators.required],
            doKhan: [data?.doKhan || ''], // Use empty string as default if not provided
            doMat: [data?.doMat || ''], // Use empty string as default if not provided
            donViSoanThao: [data?.donViSoanThao || '', Validators.required],
            banHanhTuNgay: [this.formatInputDate(data?.banHanhTuNgay), Validators.required],
            banHanhDenNgay: [this.formatInputDate(data?.banHanhDenNgay), Validators.required],
            kyHieu: [data?.kyHieu || '', Validators.required],
            trichYeu: [data?.trichYeu || '', Validators.required],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        if (this.updateForm.valid) {
            // Emit the update event with the form values
            this.update.emit(this.updateForm.value);

            // add id
            const formValue = {
                ...this.updateForm.value,
                id: this.data.id,
            };

            console.log(formValue);
            this._legalDocumentService.updateLegalDocument(formValue as LegalDocumentDto).subscribe(() => {
                // Navigate back to the current route to reload the component
                this._dialogRef.close();
                window.location.reload();
            });
        }
    }

    onDelete(event: Event) {
        this._dialogRef.close();
        this._legalDocumentService.deleteLegalDocument(this.data.id).subscribe(() => {
            // Navigate back to the current route to reload the component
            this._dialogRef.close();
            window.location.reload();
        });
        event.stopPropagation();
    }

    onCancel(event: Event) {
        this._dialogRef.close();
        event.stopPropagation();
    }

    formatDateTime(dateTime: string): string {
        return this._legalDocumentUtilsService.formatDateTime(dateTime);
    }

    formatInputDate(dateTime: DateTime): Date {
        if (dateTime) return this._legalDocumentUtilsService.formatInputDate(dateTime);
        return null;
    }

    removeEmptyStrings(input: any): any {
        return this._legalDocumentUtilsService.removeEmptyStrings(input);
    }

    clearSelection(controlName: string, event: Event): void {
        this._legalDocumentUtilsService.clearSelection(this.updateForm, controlName, event);
    }
}
