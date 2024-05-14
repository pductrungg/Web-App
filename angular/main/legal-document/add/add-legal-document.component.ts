import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { LegalDocumentServiceProxy, LegalDocumentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { LegalDocumentUtilsService } from '../utils/legal-document.utils.service';
import {
    MY_DATE_FORMAT,
    defaultCoQuanBanHanhOptions,
    defaultDoKhanOptions,
    defaultDoMatOptions,
    defaultDonViSoanThaoOptions,
    defaultLoaiVanBanOptions,
    defaultNguoiKyOptions,
} from '../common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'add-legal-documents',
    templateUrl: './add-legal-document.component.html',
    styleUrls: ['../legal-document.component.less'],
    animations: [appModuleAnimation()],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    ],
})
export class AddLegalDocumentComponent extends AppComponentBase implements OnInit {
    loaiVanBanOptions: string[] = defaultLoaiVanBanOptions;
    nguoiKyOptions: string[] = defaultNguoiKyOptions;
    coQuanBanHanhOptions: string[] = defaultCoQuanBanHanhOptions;
    doKhanOptions: string[] = defaultDoKhanOptions;
    doMatOptions: string[] = defaultDoMatOptions;
    donViSoanThaoOptions: string[] = defaultDonViSoanThaoOptions;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() add = new EventEmitter<any>();
    addForm: FormGroup;

    uploadedPinataUrls: string[] = [];

    constructor(
        injector: Injector,
        private _legalDocumentService: LegalDocumentServiceProxy,
        private _legalDocumentUtilsService: LegalDocumentUtilsService,
        private fb: FormBuilder,
        private _dialogRef: MatDialogRef<AddLegalDocumentComponent>,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {
        super(injector);
        this.addForm = this.fb.group({
            loaiVanBan: ['', Validators.required],
            nguoiKy: ['', Validators.required],
            coQuanBanHanh: ['', Validators.required],
            doKhan: [''],
            doMat: [''],
            donViSoanThao: ['', Validators.required],
            banHanhTuNgay: ['', Validators.required],
            banHanhDenNgay: ['', Validators.required],
            kyHieu: ['', Validators.required],
            trichYeu: ['', Validators.required],
            tepVanBan: [''],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        if (this.addForm.valid) {
            // Emit the add event with the form values
            this.add.emit(this.addForm.value);

            // Check if pinataUrls is empty
            if (this.uploadedPinataUrls.length === 0) {
                // Prompt the user to upload necessary files
                this._snackBar.open('Please upload the necessary files!', 'Dismiss', { duration: 5000 });
                return; // Prevent submission
            }

            const { loaiVanBan, coQuanBanHanh, nguoiKy, kyHieu, donViSoanThao, doKhan, doMat } = this.addForm.value;

            // Add tuKhoaTimKiem
            const formValue = {
                ...this.addForm.value,
                tuKhoaTimKiem: `${loaiVanBan},${coQuanBanHanh},${nguoiKy},${kyHieu},${donViSoanThao},${doKhan},${doMat}`,
            };

            // Create a new object without empty string fields
            const filteredInput = this.removeEmptyStrings(formValue);

            this._legalDocumentService.createLegalDocument(filteredInput as LegalDocumentDto).subscribe(() => {
                // Navigate back to the current route to reload the component
                this._dialogRef.close();
                window.location.reload();
            });
        }
    }

    onCancel(event: Event) {
        this._dialogRef.close();
        event.stopPropagation();
    }

    // Method to handle the emitted Pinata URLs
    handlePinataUrls(pinataUrls: string[]): void {
        this.uploadedPinataUrls = pinataUrls;
        this.addForm.patchValue({ tepVanBan: JSON.stringify(pinataUrls) });
    }

    formatDateTime(dateTime: string): string {
        return this._legalDocumentUtilsService.formatDateTime(dateTime);
    }

    removeEmptyStrings(input: any): any {
        return this._legalDocumentUtilsService.removeEmptyStrings(input);
    }

    clearSelection(controlName: string, event: Event): void {
        this._legalDocumentUtilsService.clearSelection(this.addForm, controlName, event);
    }
}
