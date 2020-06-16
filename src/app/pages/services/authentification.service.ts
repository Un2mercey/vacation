import * as angular from 'angular';
import * as _ from 'underscore';
import { User } from './../models/user/user.model';
import { IUser, IJsonUser } from './../models/user/user.interface';
import { SessionStorageService } from './session-storage.service';
import { UserTypeEnum } from './../models/user/user-type.enum';

export class AuthentificationService {

    public static selector: string = 'auth';

    private user: User;

    constructor(
        private $location: angular.ILocationService,
        private $state: ng.ui.IStateService,
        private ssService: SessionStorageService,
        private $q: angular.IQService
    ) {
        'ngInject';
        this.init();
    }

    public searchUser = (newUser: IUser, searchProp: number = 2): IUser => {
        let matchUser: IJsonUser = this.searchUserInJson(newUser, searchProp);
        if (this.checkUndefined(matchUser)) {
            this.user = new User(matchUser);
            sessionStorage.setItem('login', this.user.getLogin());
            return this.user.getIUser();
        }
    }

    public restoreUser = (): IUser => {
        return this.searchUser({login: this.ssService.getItem('login')}, 1);
    }

    public checkSessionStorage = (): boolean => {
        return Boolean(this.ssService.getItem('login'));
    }

    public checkUser = (type?: UserTypeEnum): boolean => {
        return type ? this.checkUserType(type) : this.checkUndefined(this.user);
    }

    public checkUserType = (type: UserTypeEnum): boolean => {
        return this.checkUser() && angular.equals(this.user.getType(), type);
    }

    public checkUndefined = (value: any): boolean => {
        return value !== undefined;
    }

    public clearUser = (): void => {
        this.user = undefined;
        this.ssService.clearStorage();
    }

    public getAuthUser = (): User => {
        if (this.checkUser()) {
            return this.user;
        }
    }

    public isFreeLogin = (login: string): boolean => {
        return !Boolean(this.searchUserInJson({login: login}, 1));
    }

    public getUsersList = (): ng.IPromise<Array<IJsonUser>> => {
        if (this.checkUserType(UserTypeEnum.ADMINISTRATOR)) {
            return this.$q.resolve(require('./../../../static/users.json'));
        }
    }

    public enter = (): void => {
        if (this.checkUser()) {
            switch (this.user.getType()) {
                case UserTypeEnum.ADMINISTRATOR:
                    this.$state.go('administrator');
                    break;
                case UserTypeEnum.STANDART:
                    this.$state.go('vacation');
                    break;
            }
        } else { this.exit(); }
    }

    public exit = (): void => {
        this.clearUser();
        this.$state.go('login');
    }


    private init = () => {
        if (!this.checkUser() && this.checkSessionStorage()) {
            this.restoreUser();
        } else if (!angular.equals(this.$location.url(), '/login')) { this.exit(); }
    }

    private searchUserInJson = (user: IUser, propLength: number): IJsonUser => {
        let users: Array<IJsonUser> = require('./../../../static/users.json');
        switch (propLength) {
            case 1:
                return _.find(users, (jsonUser: IJsonUser) => {
                    return angular.equals(jsonUser.login, user.login);
                });
            case 2:
                return _.find(users, (jsonUser: IJsonUser) => {
                    return angular.equals(jsonUser.login, user.login) && angular.equals(jsonUser.password, user.password);
                });
        }
    }
}
