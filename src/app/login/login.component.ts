 import {
     Component,
     OnInit,
 } from '@angular/core';

import { Router } from '@angular/router';

import { LoggerService } from '@core';

 import {
     HttpError,
     ErrorCode,
     ToastrCode,
     ErroNotificationType,
     UtilityService,
     ToastrService,
     AuthService
} from '@core';

import { Constants } from '@shared';

import { LoginModel } from './login.model';

import { LoginService } from './login.service';

import { environment } from '@env';

import { AuthService as SocialAuthService,GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';

@Component({
    moduleId: module.id,
    selector: 'login-app',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    model: LoginModel;
    showLogin = false;

    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _logger: LoggerService,
        private _utilityService: UtilityService,
        private _toastrService: ToastrService,
        private _authServiece: AuthService,
        private _socialAuthService: SocialAuthService
    ) {
        this._logger.info('LoginComponent : constructor ');
        this.model = new LoginModel();
        this.model.isAuthInitiated = false;
    }

    ngOnInit() {
        this._logger.info('LoginComponent : ngOnInit ');
        this.showLogin = true;

        if (this._authServiece.isUserLoggedIn()) {
            this._router.navigate([Constants.uiRoutes.product]);
        }
    }
    public socialSignIn(socialPlatform: string) {
        this._logger.info('LoginComponent : socialSignIn ');
        let socialPlatformProvider;       
        this.model.isAuthInitiated = true;
        if (socialPlatform === 'google') {
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }   
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
          }          
        this._socialAuthService.signIn(socialPlatformProvider).then(userData => {
            this.socialUserAccess_token(userData);
          }         
        ,errorResponse=>{ 
            this._logger.error('LoginComponent__socialAuthService.logOn : errorResponse ');
            this.resetModel();          
            this.model.isAuthInitiated = false;
            throw new HttpError(ErrorCode.AuthFailedInvalidAuthResponse, ErroNotificationType.Dialog, errorResponse);});
      }

      socialUserAccess_token(data) {  
        this._logger.info('LoginComponent : socialUserAccess_token ');    
        var response={apiToken:{access_token:data.idToken,refresh_token:data.authToken},sessionId:data.id};
        this.processLoginRequest(response);     
     
      }

    login() {
        this._logger.info('LoginComponent : login ');
        this.model.isAuthInitiated = true;
        if (!this.model.emailAddress) {
            this.model.isAuthInitiated = false;
            this._toastrService.showError(ToastrCode.EmptyEmailAddress);
        } else if (!this.model.password) {
            this.model.isAuthInitiated = false;
            this._toastrService.showError(ToastrCode.EmptyPassword);
        } else {
            this.model.isAuthInitiated = true;
            this._loginService.logOn({ UserName: this.model.emailAddress, Password: this.model.password })
                .subscribe(
                (successResponse) => {
                    this._logger.info('LoginComponent_loginService.logOn : successResponse ');
                    const response = successResponse.json();
                    response.code = '';
                    this.model.isAuthInitiated = false;
                    this.processLoginRequest(response);
                },
                (errorResponse) => {
                    this.resetModel();
                    this._logger.error('LoginComponent_loginService.logOn : errorResponse ');
                    this.model.isAuthInitiated = false;
                    throw new HttpError(ErrorCode.AuthFailedInvalidAuthResponse, ErroNotificationType.Dialog, errorResponse);
                });
        }
    }

    processLoginRequest(response: any) {
        this._logger.info('LoginComponent : processLoginRequest ');
        if (response) {

            localStorage.setItem(Constants.localStorageKeys.isLoggedIn, 'true');
            localStorage.setItem(Constants.localStorageKeys.apiToken, JSON.stringify(response.apiToken));
            localStorage.setItem(Constants.localStorageKeys.sessionId, response.sessionId);

            this._utilityService.redirectToURL(environment.appUrl);
        }
    }

    resetModel() {
        this._logger.info('LoginComponent : resetModel ');
        this.model.emailAddress = '';
        this.model.password = '';
    }
}
