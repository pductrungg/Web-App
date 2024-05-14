import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalDocumentComponent } from './legal-document.component';

const routes: Routes = [
    {
        path: '',
        component: LegalDocumentComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LegalDocumentRoutingModule {}
