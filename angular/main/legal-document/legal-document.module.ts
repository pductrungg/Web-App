import { LegalDocumentUtilsService } from './utils/legal-document.utils.service';
import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { LegalDocumentRoutingModule } from './legal-document-routing.module';
import { LegalDocumentComponent } from './legal-document.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AddLegalDocumentModule } from './add/add-legal-document.module';
import { UpdateLegalDocumentModule } from './update/update-legal-document.module';
@NgModule({
    declarations: [LegalDocumentComponent],
    imports: [
        AppSharedModule,
        AdminSharedModule,
        LegalDocumentRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        CommonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDialogModule,
        AddLegalDocumentModule,
        UpdateLegalDocumentModule
    ],
    providers: [LegalDocumentUtilsService],
})
export class LegalDocumentModule { }
