import './login.component.scss';
import * as angular from 'angular';
import * as _ from 'underscore';
import { IUser } from '../../models/user/IUser.model';
import { savedUsers } from './../../../../index';
import { Messages } from '../../../core/components/Messages';
import { LocalStorageService } from './../../services/local-storage.service';

class LoginController {

    private users: Array<IUser> = savedUsers;
    private newUser: IUser = { login: '', password: ''};
    private loginError: boolean = false;
    private passwordError: boolean = false;
    private messages = Messages;

    constructor(
        private $rootScope: angular.IRootScopeService,
        private $state: angular.ui.IStateService,
        private localStorageService: LocalStorageService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        if (this.localStorageService.checkStorage()) {
            this.checkLogin(this.localStorageService.pullUser());
        }

        this.$rootScope.$watch(() => {
            return this.newUser.login;
        }, (newValue, oldValue) => {
            this.loginError = false;
        });
        this.$rootScope.$watch(() => {
            return this.newUser.password;
        }, (newValue, oldValue) => {
            this.passwordError = false;
        });
    }

    private checkLogin = (newUser: IUser): void => {

        this.loginError = Boolean((_.find(this.users, (user: IUser) => {
            return angular.equals(user.login, newUser.login);
        }) === undefined));

        if (!this.loginError) {
            this.passwordError = Boolean((_.find(this.users, (user: IUser) => {
                return angular.equals(user.password, newUser.password);
            }) === undefined));
        }

        if (!this.loginError && !this.passwordError) {
            newUser = _.find(this.users, (user: IUser) => {
                return angular.equals(user.login, newUser.login) && angular.equals(user.password, newUser.password);
            });
            this.$state.go(newUser.type, { user: newUser });
        }
    }
}

export class Login implements angular.IComponentOptions {
    public static selector = 'login';
    public static controller = LoginController;
    public static controllerAs = 'vm';
    public static template = require('./login.component.html');
}
