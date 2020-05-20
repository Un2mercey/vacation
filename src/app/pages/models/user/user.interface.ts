import { UserTypeEnum } from './user-type.enum';

export interface IUser {
    login?: string;
    password?: string;
    name?: string;
    type?: UserTypeEnum;
}
