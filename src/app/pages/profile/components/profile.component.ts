import * as angular from 'angular';
import { AuthentificationService } from './../../services/authentification.service';
import { IEditedUser } from './../../models/user/user.interface';
import { PasswordStrengthEnum, checkStrength } from './../../models/user/password-strength';
import { Messages } from './../../models/messages/messages';

class ProfileController {

    private editedUser: IEditedUser;
    private passwordStrength: PasswordStrengthEnum;
    private messages = Messages;

    constructor(
        private auth: AuthentificationService,
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        this.discard();
    }

    private checkPasswordStrength = (): void => {
        if (this.editedUser.password === null       ||
            this.editedUser.password === undefined  ||
            this.editedUser.password === '') {
                this.editedUser.confirmPassword = '';
        } else if (this.editedUser.password.length > 5) {
            this.passwordStrength = checkStrength(this.editedUser.password);
        } else { this.passwordStrength = null; }
    }

    private checkEqualsPasswords = (): boolean => {
        return  Boolean(this.editedUser.password.length && this.editedUser.confirmPassword.length) &&
                angular.equals(this.editedUser.password, this.editedUser.confirmPassword);
    }

    private save = (): void => {
        console.log('save\nnewUser:', this.editedUser);
    }

    private discard = (): void => {
        console.log('discard');
        this.editedUser = this.auth.getUser();
        this.editedUser.password = '';
        this.editedUser.confirmPassword = '';
        this.passwordStrength = null;
    }
}

export class Profile implements angular.IComponentOptions {
    public static selector = 'profile';
    public static controller = ProfileController;
    public static controllerAs = 'vm';
    public static template = require('./profile.component.html');
}
