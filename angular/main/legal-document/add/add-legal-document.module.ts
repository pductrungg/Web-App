import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';

import { LegalDocumentUtilsService } from '../utils/legal-document.utils.service';
import { DocumentUploadModule } from '../file-upload/file-upload.module';
import { AddLegalDocumentComponent } from './add-legal-document.component';

@NgModule({
    declarations: [AddLegalDocumentComponent],
    imports: [
        AppSharedModule,
        AdminSharedModule,
        MatPaginatorModule,
        MatTableModule,
        CommonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSnackBarModule,
        DocumentUploadModule,
    ],
    providers: [LegalDocumentUtilsService],
})
export class AddLegalDocumentModule {}
