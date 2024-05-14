import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';

import { DocumentUploadComponent } from './file-upload.component';
import { LegalDocumentUtilsService } from '../utils/legal-document.utils.service';
import { PinataService } from '../utils/pinata.service';

@NgModule({
    declarations: [DocumentUploadComponent],
    imports: [AppSharedModule, AdminSharedModule, MatSnackBarModule],
    providers: [LegalDocumentUtilsService, PinataService],
    exports: [DocumentUploadComponent],
})
export class DocumentUploadModule {}
