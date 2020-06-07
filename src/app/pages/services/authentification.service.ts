import * as angular from 'angular';
import * as _ from 'underscore';
import { User } from './../models/user/user.model';
import { IUser, IJsonUser } from './../models/user/user.interface';
import { SessionStorageService } from './session-storage.service';
import { UserTypeEnum } from './../models/user/user-type.enum';

export class AuthentificationService {

    public static selector = 'auth';

    private user: User;

    constructor(
        private $location: angular.ILocationService,
        private $state: angular.ui.IStateService,
        private ssService: SessionStorageService,
        private $q: angular.IQService
    ) {
        'ngInject';
        this.init();
    }

    public searchUser = (newUser: IUser, searchProp: number = 2): IUser => {
        let users: Array<IJsonUser> = require('./../../../static/users.json');
        let matchUser: IJsonUser = this.searchUserInJson(users, newUser, searchProp);
        if (this.checkUndefined(matchUser)) {
            this.user = new User(matchUser);
            sessionStorage.setItem('login', this.user.getLogin());
            return this.getUser();
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

    public getUser = (): IUser => {
        if (this.checkUser()) {
            return {
                login: this.user.getLogin(),
                type: this.user.getType(),
                fio: {
                    lastname: this.user.getFio().getLastname(),
                    firstname: this.user.getFio().getFirstname(),
                    patronymic: this.user.getFio().getPatronymic()
                },
                email: this.user.getEmail(),
                birthdate: this.user.getBirthdate()
            };
        }
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

    public getUserShortName = (): string => {
        if (this.checkUser() && this.checkUndefined(this.user.getFio())) {
            let lastname: string = this.checkUndefined(this.user.getFio().getLastname()) ? this.user.getFio().getLastname() : '';
            let firstname: string = this.checkUndefined(this.user.getFio().getFirstname()) ? this.user.getFio().getFirstname().substr(0, 1) : '';
            let patronymic: string = this.checkUndefined(this.user.getFio().getPatronymic()) ? this.user.getFio().getPatronymic().substr(0, 1) : '';
            return `${lastname} ${firstname}. ${patronymic}.`;
        }
    }

    public getUserFullName = (): string => {
        if (this.checkUser() && this.checkUndefined(this.user.getFio())) {
            let lastname: string = this.checkUndefined(this.user.getFio().getLastname()) ? this.user.getFio().getLastname() : '';
            let firstname: string = this.checkUndefined(this.user.getFio().getFirstname()) ? this.user.getFio().getFirstname() : '';
            let patronymic: string = this.checkUndefined(this.user.getFio().getPatronymic()) ? this.user.getFio().getPatronymic() : '';
            return `${lastname} ${firstname} ${patronymic}`;
        }
    }

    private init = () => {
        if (!this.checkUser() && this.checkSessionStorage()) {
            this.restoreUser();
        } else if (!angular.equals(this.$location.url(), '/login')) { this.exit(); }
    }

    private searchUserInJson = (array: Array<IJsonUser>, user: IUser, propLength: number): IJsonUser => {
        switch (propLength) {
            case 1:
                return _.find(array, (jsonUser: IJsonUser) => {
                    return angular.equals(jsonUser.login, user.login);
                });
            case 2:
                return _.find(array, (jsonUser: IJsonUser) => {
                    return angular.equals(jsonUser.login, user.login) && angular.equals(jsonUser.password, user.password);
                });
        }
    }
}
