import './login.component.scss';
import * as angular from 'angular';
import * as _ from 'underscore';
import { UserTypeEnum } from './../../models/user/user-type.enum';
import { Messages } from './../../models/messages/messages';
import { AuthentificationService } from './../../services/authentification.service';
import { IUser } from './../../models/user/user.interface';

class LoginController {

    private newUser: IUser = { login: '', password: ''};
    private authError: boolean = false;
    private messages = Messages;

    constructor(
        private $rootScope: angular.IRootScopeService,
        private $state: angular.ui.IStateService,
        private auth: AuthentificationService,
        private $timeout: ng.ITimeoutService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        if (this.auth.checkUser()) { this.enter(); }
        this.$rootScope.$watch(() => { return this.newUser.login; }, (newValue, oldValue) => { this.authError = false; });
        this.$rootScope.$watch(() => { return this.newUser.password; }, (newValue, oldValue) => { this.authError = false; });
    }

    private checkAuth = (newUser: IUser): void => {
        this.authError = false;
        this.auth.searchUser(newUser);
        this.$timeout(() => { this.auth.checkUser() ? this.enter() : this.authError = true; });
    }

    private enter = () => {
        this.auth.checkUserType(UserTypeEnum.ADMINISTRATOR) ? this.$state.go('administrator') : this.$state.go('vacation');
    }
}

export class Login implements angular.IComponentOptions {
    public static selector = 'login';
    public static controller = LoginController;
    public static controllerAs = 'vm';
    public static template = require('./login.component.html');
}
