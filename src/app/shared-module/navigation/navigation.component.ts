import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';

import { LoggerService } from '@core';

import {
    NotificationService,
    SharedDataService
} from '@global';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'navigation-tabs',
    templateUrl: 'navigation.component.html',
    providers: []
})
export class NavigationComponent implements OnInit, OnDestroy {

    subscriptions: Subscription[];
    cartCount: number;

    constructor(
        private _router: Router,
        private _logger: LoggerService,
        private _sharedDataService: SharedDataService,
        private _notificationService: NotificationService,

    ) {
        this.subscriptions = [];
    }

    ngOnInit() {
        this._logger.info('NavigationComponent : ngOnInit ');

        this.subscriptions.push(

            this._notificationService.productAddedToCartFromDialogNotification.subscribe(() => {
                this.cartCount = 10; // get from server
            }),

            this._notificationService.productAddedToCartNotification.subscribe(() => {
                this.cartCount = 10; // get from server
            })
        );
    }

    ngOnDestroy() {
        this._logger.info('NavigationComponent : ngOnDestroy ');
        this.subscriptions.forEach((s) => {
            s.unsubscribe();
        });
    }

}
