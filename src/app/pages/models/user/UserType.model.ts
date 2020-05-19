export enum UserTypeEnum {
    ADMINISTRATOR = 'administrator',
    DEFAULT = 'default'
}

export class UserType {

    private value: UserTypeEnum;
    private title: string;

    constructor(type: UserTypeEnum | string) {
        if (typeof type === 'string') {
            switch (type) {
                case 'administrator':
                    this.value = UserTypeEnum.ADMINISTRATOR;
                    break;
                case 'default':
                    this.value = UserTypeEnum.DEFAULT;
                    break;
            }
        }
    }

    public getValue = (): UserTypeEnum => {
        return this.value;
    }

    public getTitle = (): string => {
        return this.title;
    }
}
