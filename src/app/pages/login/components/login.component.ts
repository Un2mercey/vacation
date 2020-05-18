import './login.component.scss';
import * as angular from 'angular';
import * as _ from 'underscore';
import { IUser } from './../../model/user.model';
import { savedUsers } from './../../../../index';

class LoginController {

    private users: Array<IUser> = savedUsers;

    constructor(
        private $state: angular.ui.IStateService,
        private $q: angular.IQService,
        private $http: angular.IHttpService
    ) {
        'ngInject';
    }

    $onInit = () => {
        console.log('oninit');
    }

    public checklogin = (newUser: IUser) => {
        console.log('checklogin');
        if (_.find(this.users, (user: IUser) => {
            return angular.equals(user.login, newUser.login) && angular.equals(user.password, newUser.password);
        }) !== undefined) {
            console.log('find true');
        } else {
            console.log('find false');
        }
    }
}

export class Login implements angular.IComponentOptions {
    static selector = 'login';
    static controller = LoginController;
    static controllerAs = 'vm';
    static template = require('./login.component.html');
}
