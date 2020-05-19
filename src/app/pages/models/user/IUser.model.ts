import { UserTypeEnum } from './UserType.model';

export interface IUser {
    login: string;
    password: string;
    name?: string;
    type?: UserTypeEnum;
}
