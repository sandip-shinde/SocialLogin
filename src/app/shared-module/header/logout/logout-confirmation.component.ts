import {
    Component,
    ViewChild,
    ViewEncapsulation,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';

import { Router } from '@angular/router';
import { LoggerService } from '@core';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'logout-confirmation',
    templateUrl: 'logout-confirmation.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LogoutConfirmationComponent {

    @Output() onLogoutConfirmation = new EventEmitter<boolean>();

    _displayModal = false;

    constructor(
        private router: Router,
        private _logger: LoggerService,
        private _cdRef: ChangeDetectorRef
    ) {
        this._logger.info('LogoutConfirmationComponent : ngOnInit ');
    }

    showConfirmation() {
        this._logger.info('LogoutConfirmationComponent : showConfirmation ');
        this._displayModal = true;
        this._cdRef.detectChanges();
    }

    closeAndInstructLogoutToParent() {
        this._logger.info('LogoutConfirmationComponent : closeAndInstructLogoutToParent ');
        this._displayModal = false;
        this.onLogoutConfirmation.emit(true);
    }

    dismissModal() {
    }
}
