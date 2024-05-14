import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {StatisticRoutingModule} from './statistic-routing.module';
import {StatisticComponent} from './statistic.component';
import {LegalDocumentModule} from '../legal-document/legal-document.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [StatisticComponent],
    imports: [AppSharedModule,
         StatisticRoutingModule,
         LegalDocumentModule,
         MatTableModule]
})
export class StatisticModule {}