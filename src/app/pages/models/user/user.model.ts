import { IJsonUser, IUser } from './user.interface';
import { UserTypeEnum, serializeUserType } from './user-type.enum';
import { Fio, IFio } from './fio.model';

export class User {

    private login: string;
    private type: UserTypeEnum;
    private fio: Fio;
    private email: string;
    private birthdate: Date;

    constructor(newUser: IJsonUser) {
        this.setLogin(newUser.login);
        this.setType(serializeUserType(newUser.type));
        this.setFio(newUser.fio);
        this.setEmail(newUser.email);
        this.setBirthdate(new Date(JSON.parse(newUser.birthdate)));
    }

    public setLogin = (newLogin: string): void => {
        this.login = newLogin;
    }

    public getLogin = (): string => {
        return this.login;
    }

    public setType = (newtype: UserTypeEnum): void => {
        this.type = newtype;
    }

    public getType = (): UserTypeEnum => {
        return this.type;
    }

    public setFio = (fio: IFio): void => {
        this.fio = new Fio(fio);
    }

    public getFio = (): Fio => {
        return this.fio;
    }

    public getEmail = (): string => {
        return this.email;
    }

    public setEmail = (email: string): void => {
        this.email = email;
    }

    public getBirthdate = (): Date => {
        return this.birthdate;
    }

    public setBirthdate = (birthdate: Date): void => {
        this.birthdate = birthdate;
    }

    public getIUser = (): IUser => {
        return {
            login: this.getLogin(),
            type: this.getType(),
            fio: {
                lastname: this.getFio().getLastname(),
                firstname: this.getFio().getFirstname(),
                patronymic: this.getFio().getPatronymic()
            },
            email: this.getEmail(),
            birthdate: this.getBirthdate()
        };
    }

    public getShortName = (): string => {
        let lastname: string = this.getFio().getLastname();
        let firstname: string = this.getFio().getFirstname().substr(0, 1);
        let patronymic: string = this.getFio().getPatronymic().substr(0, 1);
        return `${lastname} ${firstname}. ${patronymic}.`;
    }

    public getFullName = (): string => {
        let lastname: string = this.getFio().getLastname();
        let firstname: string = this.getFio().getFirstname();
        let patronymic: string = this.getFio().getPatronymic();
        return `${lastname} ${firstname} ${patronymic}`;
    }
}
