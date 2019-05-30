import { ModuleWithProviders } from '@angular/core';

import {
    Routes,
    RouterModule
} from '@angular/router';

import { PageNotFoundComponent } from '@core';

import { AuthGuardService } from '@global';

import { Constants } from '@shared';

import { ProductComponent } from './shop-module/product/product.component';
import { OfferComponent } from './shop-module/offer/offer.component';
import { InvoiceComponent } from './order-module/invoice/invoice.component';
import { OrderComponent } from './order-module/order/order.component';
import { LoginComponent } from './login';

const appRoutes: Routes = [
    {
        path: Constants.uiRoutes.empty,
        component: LoginComponent
    },
    {
        path: Constants.uiRoutes.product,
        component: ProductComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.offer,
        component: OfferComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.order,
        component: OrderComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.invoice,
        component: InvoiceComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
