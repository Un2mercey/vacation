import * as angular from 'angular';
import * as _ from 'underscore';
import { User } from './../models/user/user.model';
import { IUser, IJsonUser } from './../models/user/user.interface';
import { SessionStorageService } from './session-storage.service';
import { UserTypeEnum } from '../models/user/user-type.enum';

export class AuthentificationService {

    public static selector = 'auth';

    private user: User;

    constructor(
        private $state: angular.ui.IStateService,
        private ssService: SessionStorageService,
        private $q: angular.IQService
    ) {
        'ngInject';
    }

    public searchUser = (newUser: IUser, searchProp: number = 2): IUser => {
        let users: Array<IJsonUser> = require('./../../../static/users.json');
        let matchUser: IJsonUser = this.findUser(users, newUser, searchProp);
        if (this.checkUndefined(matchUser)) {
            this.user = new User(matchUser);
            sessionStorage.setItem('login', this.user.getLogin());
            return this.getUser();
        }
    }

    public checkSessionStorage = (): boolean => {
        return Boolean(this.ssService.getItem('login'));
    }

    public checkUser = (type?: UserTypeEnum): boolean => {
        if (type) {
            if (this.checkUndefined(this.user)) { return this.checkUserType(type);
            } else if (this.checkSessionStorage() && this.checkUndefined(this.restoreUser())) { return this.checkUserType(type);
            } else { return false; }
        } else { return this.checkUndefined(this.user); }
    }

    public checkUserType = (type: UserTypeEnum): boolean => {
        return angular.equals(this.user.getType(), type);
    }

    public clearUser = (): void => {
        this.user = undefined;
        this.ssService.clearStorage();
    }

    public getUser = (): IUser => {
        return {
            login: this.user.getLogin(),
            type: this.user.getType(),
            fio: {
                lastName: this.user.getFio().getLastName(),
                firstName: this.user.getFio().getFirstName(),
                secondName: this.user.getFio().getSecondName()
            },
            email: this.user.getEmail(),
            birthdate: this.user.getBirthdate()
        };
    }

    public getUsersList = (): ng.IPromise<Array<IJsonUser>> => {
        if (this.checkUserType(UserTypeEnum.ADMINISTRATOR)) {
            return this.$q.resolve(require('./../../../static/users.json'));
        }
    }

    public restoreUser = (): IUser => {
        return this.searchUser({login: this.ssService.getItem('login')}, 1);
    }

    public enter = () => {
        switch (this.user.getType()) {
            case UserTypeEnum.ADMINISTRATOR:
                this.$state.go('administrator');
                break;
            case UserTypeEnum.STANDART:
                this.$state.go('vacation');
                break;
        }
    }

    public exit = () => {
        this.clearUser();
        this.$state.go('login');
    }

    public getUserShortName = (): string => {
        if (this.checkUndefined(this.user) && this.checkUndefined(this.user.getFio())) {
            let lastName: string = this.checkUndefined(this.user.getFio().getLastName()) ? this.user.getFio().getLastName() : '';
            let firstName: string = this.checkUndefined(this.user.getFio().getFirstName()) ? this.user.getFio().getFirstName().substr(0, 1) : '';
            let secondName: string = this.checkUndefined(this.user.getFio().getSecondName()) ? this.user.getFio().getSecondName().substr(0, 1) : '';
            return `${lastName} ${firstName}. ${secondName}.`;
        }
    }

    public getUserFullName = (): string => {
        if (this.checkUndefined(this.user) && this.checkUndefined(this.user.getFio())) {
            let lastName: string = this.checkUndefined(this.user.getFio().getLastName()) ? this.user.getFio().getLastName() : '';
            let firstName: string = this.checkUndefined(this.user.getFio().getFirstName()) ? this.user.getFio().getFirstName() : '';
            let secondName: string = this.checkUndefined(this.user.getFio().getSecondName()) ? this.user.getFio().getSecondName() : '';
            return `${lastName} ${firstName} ${secondName}`;
        }
    }

    private checkUndefined = (value: any): boolean => {
        return value !== undefined;
    }

    private findUser = (array: Array<IJsonUser>, user: IUser, propLength: number): IJsonUser => {
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
