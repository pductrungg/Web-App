import { Component,OnInit,ViewChild ,Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MatTableDataSource } from '@angular/material/table';

import { LegalDocumentDto, LegalDocumentServiceProxy ,ListResultDtoOfLegalDocumentDto} from '@shared/service-proxies/service-proxies';
import { FormGroup, FormBuilder  } from '@angular/forms';

interface CoQuanBanHanhItem {
    coQuanBanHanh: string;
    total: number;
    type1: number;
    type2: number;
    items: LegalDocumentDto[];
}
@Component({
    templateUrl: './Statistic.component.html',
    animations: [appModuleAnimation()]
})

export class StatisticComponent extends AppComponentBase implements OnInit{
    legalDocuments = new MatTableDataSource<LegalDocumentDto>([]);
    coQuanBanHanhArray: CoQuanBanHanhItem[] = [];
    searchForm: FormGroup;

    displayedColumns: string[] = ['stt', 'departmentName', 'legalDocs', 'directiveDocs', 'total']; // Add more columns as needed

    constructor(
        injector: Injector,
        private _legalDocumentService: LegalDocumentServiceProxy,
        private _fb: FormBuilder
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.loadLegalDocuments();
    }
    loadLegalDocuments() {
        // Use the injected LegalDocumentServiceProxy to fetch legal documents
        this._legalDocumentService.getAllLegalDocuments().subscribe(
            (result: ListResultDtoOfLegalDocumentDto) => {

                this.legalDocuments.data = result.items; // Set the legal documents data
                const coQuanBanHanhMap = new Map<string, CoQuanBanHanhItem>(); 
                console.log(result.items)
                result.items.forEach(item => {
                    const coQuanBanHanh = item.coQuanBanHanh;;
                    if (!coQuanBanHanhMap.has(coQuanBanHanh)) {
                        coQuanBanHanhMap.set(coQuanBanHanh, {
                            coQuanBanHanh: coQuanBanHanh,
                            total: 1, // Start the count at 1
                            type1: 1,
                            type2: 0,
                            items: [item]
                        });
                    }else{
                        const existingItem = coQuanBanHanhMap.get(coQuanBanHanh);
                        existingItem.total++;
                        console.log(existingItem.type1);
                        existingItem.type1++;
                        
                        existingItem.items.push(item)
                    }
                });
                this.coQuanBanHanhArray = Array.from(coQuanBanHanhMap.values());
            },
            error => {
                console.error('There was an error retrieving the legal documents', error);
            }
        );
    }

}