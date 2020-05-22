export enum UserTypeEnum {
    ADMINISTRATOR = 'administrator',
    STANDART = 'standart'
}

export function serializeUserType(type: string): UserTypeEnum {
    switch (type) {
        case 'administrator':
            return UserTypeEnum.ADMINISTRATOR;
        case 'standart':
            return UserTypeEnum.STANDART;
    }
}
