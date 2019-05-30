import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders
} from '@angular/core';

import { ProductComponent } from "./product/product.component";
import { OfferComponent } from "./offer/offer.component";
import { SharedModule } from "../shared-module/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ProductComponent,   
        OfferComponent
    ],
    providers: [
    ]
})

export class ShopModule {}