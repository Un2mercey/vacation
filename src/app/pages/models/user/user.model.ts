import { UserTypeEnum } from './user-type.enum';
import { IUser } from './user.interface';

export class User {

    private login: string;
    private name: string;
    private type: UserTypeEnum;

    constructor(newUser: IUser) {
        this.setLogin(newUser.login);
        this.setName(newUser.name);
        this.setType(newUser.type);
    }

    public setLogin = (newLogin: string): void => {
        this.login = newLogin;
    }

    public getLogin = (): string => {
        return this.login;
    }

    public setName = (newName: string): void => {
        this.name = newName;
    }

    public getName = (): string => {
        return this.name;
    }

    public setType = (newtype: UserTypeEnum): void => {
        this.type = newtype;
    }

    public getType = (): UserTypeEnum => {
        return this.type;
    }
}
