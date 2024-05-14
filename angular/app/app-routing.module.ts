import { NgModule } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { NotificationsComponent } from './shared/layout/notifications/notifications.component';
import { NgxSpinnerService } from 'ngx-spinner';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'app',
                component: AppComponent,
                children: [
                    {
                        path: '',
                        children: [{ path: '', redirectTo: '/app/main/legal-document', pathMatch: 'full' }],
                    },
                    {
                        path: 'main',
                        loadChildren: () => import('app/main/main.module').then((m) => m.MainModule), //Lazy load main module
                        data: { preload: true },
                    },
                    {
                        path: 'admin',
                        loadChildren: () => import('app/admin/admin.module').then((m) => m.AdminModule), //Lazy load admin module
                        data: { preload: true },
                        canLoad: [AppRouteGuard],
                    },
                    {
                        path: '**',
                        redirectTo: '/app/main/legal-document',
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
    constructor(private router: Router, private spinnerService: NgxSpinnerService) {
        router.events.subscribe((event) => {
            if (event instanceof RouteConfigLoadStart) {
                spinnerService.show();
            }

            if (event instanceof RouteConfigLoadEnd) {
                spinnerService.hide();
            }

            if (event instanceof NavigationEnd) {
                document.querySelector('meta[property=og\\:url').setAttribute('content', window.location.href);
            }
        });
    }
}
