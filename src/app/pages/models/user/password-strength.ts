export enum PasswordStrengthEnum {
    STRONG = 'strong',
    MEDIUM = 'medium',
    LOW = 'low'
}

const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

export function checkStrength(password: string): PasswordStrengthEnum {
    console.log('password inner:', password);
    if (strongRegex.test(password)) { return PasswordStrengthEnum.STRONG;
    } else if (mediumRegex.test(password)) { return PasswordStrengthEnum.MEDIUM;
    } else { return PasswordStrengthEnum.LOW; }
}
