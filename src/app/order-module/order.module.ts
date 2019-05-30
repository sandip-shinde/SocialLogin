import { NgModule } from '@angular/core';

import { SharedModule } from '../shared-module/shared.module';
import { InvoiceComponent } from "./invoice/invoice.component";
import { OrderComponent } from "./order/order.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        InvoiceComponent,
        OrderComponent
    ],
    providers: [
        
    ]
})
export class OrderModule { }