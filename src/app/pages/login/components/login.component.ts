import './login.component.scss';
import * as angular from 'angular';
import * as _ from 'underscore';
import { IUser } from '../../model/user/IUser.model';
import { savedUsers } from './../../../../index';
import { Messages } from '../../../core/components/Messages';

class LoginController {

    private users: Array<IUser> = savedUsers;
    private newUser: IUser = { login: '', password: ''};
    private loginError: boolean = false;
    private passwordError: boolean = false;
    private messages = Messages;

    constructor(
        private $state: angular.ui.IStateService,
        private $q: angular.IQService,
        private $http: angular.IHttpService,
        private $rootScope: angular.IRootScopeService
    ) {
        'ngInject';
    }

    $onInit = () => {
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

    private checkLogin = (newUser: IUser) => {

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
            this.$state.go(newUser.type, {user: newUser});
        }
    }
}

export class Login implements angular.IComponentOptions {
    static selector = 'login';
    static controller = LoginController;
    static controllerAs = 'vm';
    static template = require('./login.component.html');
}
