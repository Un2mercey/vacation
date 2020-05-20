import './login.component.scss';
import * as angular from 'angular';
import * as _ from 'underscore';
import { IUser } from '../../models/user/user.model';
import { UserTypeEnum } from '../../models/user/userType.model';
import { Messages } from '../../../core/components/Messages';
import { AuthentificationService } from './../../services/authentification.service';

class LoginController {

    private newUser: IUser = { login: '', password: ''};
    private loginError: boolean = false;
    private messages = Messages;

    constructor(
        private $rootScope: angular.IRootScopeService,
        private $state: angular.ui.IStateService,
        private auth: AuthentificationService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        if (this.auth.checkUser()) { this.checkLogin(this.auth.getUser(), true); }
        this.$rootScope.$watch(() => { return this.newUser.login; }, (newValue, oldValue) => { this.loginError = false; });
        this.$rootScope.$watch(() => { return this.newUser.password; }, (newValue, oldValue) => { this.loginError = false; });
    }

    private checkLogin = (newUser: IUser, fromInit?: boolean): void => {
        this.loginError = false;
        if (fromInit) {
        //  user was logged
            this.auth.checkUserType(UserTypeEnum.ADMINISTRATOR) ? this.$state.go('administrator') : this.$state.go('vacation');
        } else {
            this.auth.findUser(newUser) ?
            //  @true
                this.auth.checkUserType(UserTypeEnum.ADMINISTRATOR) ? this.$state.go('administrator') : this.$state.go('vacation')
            //  @false
              : this.loginError = true;
        }
    }
}

export class Login implements angular.IComponentOptions {
    public static selector = 'login';
    public static controller = LoginController;
    public static controllerAs = 'vm';
    public static template = require('./login.component.html');
}
