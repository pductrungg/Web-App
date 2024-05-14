import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UpdateLegalDocumentComponent } from './update-legal-document.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LegalDocumentUtilsService } from '../utils/legal-document.utils.service';

@NgModule({
    declarations: [UpdateLegalDocumentComponent],
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
    ],
    providers: [LegalDocumentUtilsService],
})
export class UpdateLegalDocumentModule {}
