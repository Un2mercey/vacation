export interface IFio {
    lastName?: string;
    firstName?: string;
    secondName?: string;
}

export class Fio {

    private lastName: string;
    private firstName: string;
    private secondName: string;

    constructor(fio: IFio) {
        this.setLastName(fio.lastName);
        this.setFirstName(fio.firstName);
        this.setSecondName(fio.secondName);
    }

    public setLastName = (lastName: string): void => {
        this.lastName = lastName;
    }

    public getLastName = (): string => {
        return this.lastName;
    }

    public setFirstName = (firstName: string): void => {
        this.firstName = firstName;
    }

    public getFirstName = (): string => {
        return this.firstName;
    }

    public setSecondName = (secondName: string): void => {
        this.secondName = secondName;
    }

    public getSecondName = (): string => {
        return this.secondName;
    }
}
