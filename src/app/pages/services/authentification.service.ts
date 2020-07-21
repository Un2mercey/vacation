import * as angular from 'angular';
import * as _ from 'underscore';
import { User } from './../models/user/user.model';
import { IUser, IJsonUser } from './../models/user/user.interface';
import { SessionStorageService } from './session-storage.service';
import { UserTypeEnum } from './../models/user/user-type.enum';
import { UsersApiService } from './users-api.service';

export class AuthentificationService {

    public static selector: string = 'auth';

    private user: User;

    constructor(
        private $location: angular.ILocationService,
        private ssService: SessionStorageService,
        private usersApiService: UsersApiService,
        private $state: ng.ui.IStateService
    ) {
        'ngInject';
        this.init();
    }

    public searchUser = (newUser: IUser, searchProp: number = 2): ng.IPromise<IUser | void> => {
        return this.searchUserInJson(newUser, searchProp)
            .then((response: IJsonUser) => {
                if (this.checkUndefined(response)) {
                    this.user = new User(response);
                    this.ssService.setItem('login', this.user.getLogin());
                    return this.user.getIUser();
                }
            })
            .catch((error: any) => { console.error(error); });
    }

    public restoreUser = (): ng.IPromise<IUser | void> => {
        return this.searchUser({login: this.ssService.getItem('login')}, 1)
                .then((response: IUser) => response)
                .catch((error: any) => { console.error(error); });
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

    public isFreeLogin = (login: string): ng.IPromise<boolean | void> => {
        return this.searchUserInJson({login: login}, 1)
            .then((response: IJsonUser) => {
                return Boolean(response) ? !Boolean(angular.equals(this.user.getIUser(), new User(response).getIUser())) : true;
            })
            .catch((error: any) => { console.error(error); });
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

    public getUsersList = (): ng.IPromise<Array<IJsonUser>> => {
        if (this.checkUserType(UserTypeEnum.ADMINISTRATOR)) {
            return this.usersApiService.getUsersJson()
                .then((response: any) => response.data)
                .catch((error: any) => { console.error(error); });
        }
    }
    public returnedFn = (): string | number => {
        return 'str';
    }

    private init = () => {
        console.log('init');
        if (!this.checkUser() && this.checkSessionStorage()) {
            console.log('init in if');
            this.restoreUser()
                .then((response: IUser) => {
                    console.log('init in then');
                    this.enter();
                })
                .catch((error: any) => { console.error(error); });
        } else if (!angular.equals(this.$location.url(), '/login')) {
            console.log('init in else if');
            this.exit();
        }
    }

    private searchUserInJson = (user: IUser, propLength: number): ng.IPromise<IJsonUser | any> => {
        return this.usersApiService.getUsersJson()
            .then((response: any) => {
                switch (propLength) {
                    case 1:
                        return _.find(response.data, (jsonUser: IJsonUser) => {
                            return angular.equals(jsonUser.login, user.login);
                        });
                    case 2:
                        return _.find(response.data, (jsonUser: IJsonUser) => {
                            return angular.equals(jsonUser.login, user.login) && angular.equals(jsonUser.password, user.password);
                        });
                }
            })
            .catch((error: any) => { console.error(error); });
    }
}
