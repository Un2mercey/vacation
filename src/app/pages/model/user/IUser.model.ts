import { UserType } from './UserType.model';

export interface IUser {
    login: string;
    password: string;
    name?: string;
    type?: UserType;
}
