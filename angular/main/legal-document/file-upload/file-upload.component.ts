import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppConsts } from '@shared/AppConsts';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';

import { PinataService } from './../utils/pinata.service';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    animations: [appModuleAnimation()],
})
export class DocumentUploadComponent extends AppComponentBase {
    // Define an event emitter to emit the Pinata URLs
    @Output() pinataUrlsUploaded: EventEmitter<string[]> = new EventEmitter<string[]>();

    uploadUrl: string;
    uploadedFiles: string[] = [];

    constructor(injector: Injector, private _pinataService: PinataService, private _snackBar: MatSnackBar) {
        super(injector);
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/DemoUiComponents/UploadFiles';
    }

    // upload completed event
    async onUpload(event): Promise<void> {
        const pinataUrls: string[] = []; // Array to store Pinata URLs

        // Show a notification indicating that the upload has started and set the duration to indefinite
        const snackbarRef = this._snackBar.open('Uploading files...', 'Dismiss', { duration: 0 });

        for (const file of event.files) {
            this.uploadedFiles.push(file);
            try {
                // upload the file to IPFS
                const response = await this._pinataService.uploadFileToIPFS(file);
                if (response.success === true) {
                    console.log('Uploaded image to Pinata: ', response.pinataURL);
                    pinataUrls.push(response.pinataURL); // Add the Pinata URL to the array
                }
            } catch (e) {
                console.log('Error during file upload', e);
            }
        }

        // Emit the event with the Pinata URLs
        this.pinataUrlsUploaded.emit(pinataUrls);

        // Close the snackbar once all uploads are completed
        snackbarRef.dismiss();

        // Show a notification indicating that the upload has finished
        this._snackBar.open('Files uploaded successfully!', 'Dismiss', { duration: 2000 });
    }

    onBeforeSend(event): void {
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
    }
}
