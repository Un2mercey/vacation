import { UserTypeEnum } from './user-type.enum';
import { IFio } from './fio.model';

export interface IUser {
    login?: string;
    password?: string;
    type?: UserTypeEnum;
    fio?: IFio;
    email?: string;
    birthdate?: Date;
}

export interface IEditedUser extends IUser{
    confirmPassword?: string;
}

export interface IJsonUser {
    login?: string;
    password?: string;
    type?: string;
    fio?: IFio;
    email?: string;
    birthdate?: string;
}
