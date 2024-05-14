import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'legal-document',
                        loadChildren: () =>
                            import('./legal-document/legal-document.module').then((m) => m.LegalDocumentModule),
                    },
                    {
                        path: 'statistic',
                        loadChildren: () => 
                            import('./statistic/statistic.module').then(m => m.StatisticModule)
                    },

                    { path: '', redirectTo: 'legal-document', pathMatch: 'full' },
                    { path: '**', redirectTo: 'legal-document' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {}
