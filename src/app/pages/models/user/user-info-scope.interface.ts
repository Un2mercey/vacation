import { User } from './user.model';

export interface IUserInfoScope extends angular.IScope {
    user: User;
    visible: boolean;
}
