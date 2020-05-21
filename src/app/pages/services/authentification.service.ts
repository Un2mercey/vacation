import * as angular from 'angular';
import * as _ from 'underscore';
import { User } from './../models/user/user.model';
import { IUser } from './../models/user/user.interface';
import { UserTypeEnum } from './../models/user/user-type.enum';
import { SessionStorageService } from './session-storage.service';

export class AuthentificationService {

    public static selector = 'auth';

    private user: User;

    constructor(
        private $q: angular.IQService,
        private ssService: SessionStorageService
    ) {
        'ngInject';
    }

    public searchUser = (newUser: IUser, searchProp: number = 2): IUser => {
        let users: Array<IUser> = require('./../../../static/users.json');
        let matchUser: IUser = this.findUser(users, newUser, searchProp);
        if (matchUser !== undefined) {
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
            if (this.user !== undefined) { return this.checkUserType(type);
            } else if (this.checkSessionStorage() && this.restoreUser() !== undefined) { return this.checkUserType(type);
            } else { return false; }
        } else { return this.user !== undefined; }
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
            name: this.user.getName()
        };
    }

    public getUsersList = (): ng.IPromise<Array<IUser>> => {
        if (this.checkUserType(UserTypeEnum.ADMINISTRATOR)) {
            return this.$q.resolve(require('./../../../static/users.json'));
        }
    }

    public restoreUser = (): IUser => {
        return this.searchUser({login: this.ssService.getItem('login')}, 1);
    }

    private findUser = (array: Array<IUser>, user: IUser, propLength: number): IUser => {
        switch (propLength) {
            case 1:
                return _.find(array, (arUser: IUser) => {
                    return angular.equals(arUser.login, user.login);
                });
            case 2:
                return _.find(array, (arUser: IUser) => {
                    return angular.equals(arUser.login, user.login) && angular.equals(arUser.password, user.password);
                });
        }
    }
}
