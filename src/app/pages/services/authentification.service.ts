import * as angular from 'angular';
import * as _ from 'underscore';
import { IUser, User } from './../models/user/user.model';
import { savedUsers } from './../../../index';
import { UserTypeEnum } from '../models/user/userType.model';

export class AuthentificationService {

    public static selector = 'auth';

    private users: Array<IUser> = savedUsers;
    private user: User;

    public findUser = (newUser: IUser): IUser => {
        if (this.checkUser() && this.findInUsers(this.getUser()) !== undefined) {
            return this.getUser();
        } else {
            let matchUser: IUser = this.findInUsers(newUser);
            if (matchUser !== undefined) {
                this.setUser(matchUser);
                return this.getUser();
            }
        }
    }

    public checkUser = (): boolean => {
        return this.user !== undefined ? true : false;
    }

    public checkUserType = (type: UserTypeEnum): boolean => {
        return this.checkUser() ? angular.equals(this.user.getType(), type) : false;
    }

    public clearUser = (): void => {
        this.user = undefined;
    }

    public setUser = (newUser: IUser): void => {
        this.user = new User(newUser);
    }

    public getUser = (): IUser => {
        return {
            login: this.user.getLogin(),
            type: this.user.getType(),
            name: this.user.getName()
        };
    }

    private findInUsers = (finder: IUser): IUser => {
        return _.find(this.users, (user: IUser) => {
            return  angular.equals(user.login, finder.login) && angular.equals(user.password, finder.password);
        });
    }
}
