import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Column } from '../common';
import { FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';

@Injectable()
export class LegalDocumentUtilsService {
    formatDateTime(dateTime: string): string {
        const parsedDate = new Date(dateTime);
        return formatDate(parsedDate, 'dd-MM-yyyy HH:mm', 'en-US');
    }

    formatInputDate(dateTime: string | DateTime): Date {
        if (typeof dateTime === 'string') {
            return new Date(dateTime);
        }
        return new Date(dateTime.month + '/' + dateTime.day + '/' + dateTime.year);
    }

    getColumnData(value: string, columns: Column[]): Column {
        return columns.find((item) => item.value === value);
    }

    removeEmptyStrings(input: any): any {
        const filteredInput = {};
        Object.keys(input).forEach((key) => {
            if (input[key] !== '' && input[key] !== null) {
                filteredInput[key] = input[key];
            }
        });
        return filteredInput;
    }

    clearSelection(form: FormGroup, controlName: string, event: Event): void {
        form.get(controlName).setValue(null);
        event.stopPropagation();
    }

    isLoggedIn(): boolean {
        return abp.session.userId > 0
    }
}
