import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
    LoggerService,
    HttpService
} from '@core';

import { Constants } from '@shared';

@Injectable()
export class LoginService {

    constructor(
        private _http: HttpService,
        private _logger: LoggerService
    ) {
        this._logger.info('LoginService : constructor ');
    }

    logOn(request: any): Observable<any> {
        this._logger.info('LoginService : logOn ');
        return this._http.post(`${Constants.webApis.login}`, request);
    }

}
