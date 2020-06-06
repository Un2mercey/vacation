export interface IFio {
    lastname?: string;
    firstname?: string;
    patronymic?: string;
}

export class Fio {

    private lastname: string;
    private firstname: string;
    private patronymic: string;

    constructor(fio: IFio) {
        this.setLastname(fio.lastname);
        this.setFirstname(fio.firstname);
        this.setPatronymic(fio.patronymic);
    }

    public setLastname = (lastname: string): void => {
        this.lastname = lastname;
    }

    public getLastname = (): string => {
        return this.lastname;
    }

    public setFirstname = (firstname: string): void => {
        this.firstname = firstname;
    }

    public getFirstname = (): string => {
        return this.firstname;
    }

    public setPatronymic = (patronymic: string): void => {
        this.patronymic = patronymic;
    }

    public getPatronymic = (): string => {
        return this.patronymic;
    }
}
