import * as angular from 'angular';
import { IUser } from './../models/user/IUser.model';
import { UserType, UserTypeEnum } from './../models/user/UserType.model';

export class LocalStorageService {

    public static selector = 'localStorageService';

    public pushUser = (user: IUser): void => {
        if (user) {
            this.setItem('login', user.login);
            this.setItem('password', user.password);
            this.setItem('type', user.type);
            if (user.name) {
                this.setItem('name', user.name);
            }
        }
    }

    public pullUser = (): IUser => {
        return {
            login: this.getItem('login'),
            password: this.getItem('password'),
            type: new UserType(this.getItem('type')).getValue(),
            name: this.getItem('name')
        };
    }

    public checkStorage = (userType?: UserTypeEnum): boolean => {
        let user: IUser = this.pullUser();
        if (userType) {
            return Boolean(user.login) && Boolean(user.password) && angular.equals(userType, user.type);
        } else {
            return Boolean(user.login) && Boolean(user.password) && Boolean(user.type);
        }
    }

    public clearStorage = (): void => {
        localStorage.clear();
    }

    private getItem = (key: string): string => {
        return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }

    private setItem = (key: string, value: string): void => {
        localStorage.setItem(key, value);
    }
}
