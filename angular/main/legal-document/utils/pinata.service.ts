import axios from 'axios';
import * as FormData from 'form-data';

import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class PinataService {
    private readonly PINATA_API_KEY: string;
    private readonly PINATA_API_SECRET: string;
    private readonly PINATA_JWT: string;

    constructor() {
        // Assign environment variables from Angular's environment object
        this.PINATA_API_KEY = environment.pinataApiKey;
        this.PINATA_API_SECRET = environment.pinataApiSecret;
        this.PINATA_JWT = environment.pinataJwt;
    }

    async uploadJSONToIPFS(JSONBody: any): Promise<any> {
        const JWT = `Bearer ${this.PINATA_JWT}`;
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

        try {
            const response = await axios.post(url, JSONBody, {
                headers: {
                    Authorization: JWT,
                },
            });

            console.log('JSON file uploaded', response.data.IpfsHash);

            return {
                success: true,
                pinataURL: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
            };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: error.message,
            };
        }
    }

    async uploadFileToIPFS(file: File): Promise<any> {
        const JWT = `Bearer ${this.PINATA_JWT}`;
        const data = new FormData();
        data.append('file', file);

        const metadata = JSON.stringify({
            name: file.name,
            keyvalues: {
                exampleKey: 'exampleValue',
            },
        });
        data.append('pinataMetadata', metadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        data.append('pinataOptions', pinataOptions);

        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

        try {
            const response = await axios.post(url, data, {
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': `multipart/form-data`,
                    Authorization: JWT,
                },
            });

            console.log('image uploaded', response.data.IpfsHash);

            return {
                success: true,
                pinataURL: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
            };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: error.message,
            };
        }
    }
}
