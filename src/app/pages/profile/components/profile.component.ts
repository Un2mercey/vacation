import * as angular from 'angular';
import { AuthentificationService } from './../../services/authentification.service';
import { IUser, IEditedUser } from './../../models/user/user.interface';
import { PasswordStrengthEnum } from './../../models/user/password-strength.enum';

class ProfileController {

    private currentUser: IUser;
    private editedUser: IEditedUser;
    private passwordStrength: PasswordStrengthEnum;

    constructor(
        private auth: AuthentificationService,
        private $rootScope: angular.IRootScopeService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        this.currentUser = this.auth.getUser();
        this.discard();
        this.$rootScope.$watch(() => { return this.editedUser.password; }, (newValue, oldValue) => {
            if (newValue === null || newValue === undefined || newValue === '') {
                this.editedUser.password = '';
                this.editedUser.confirmPassword = '';
            }
        });
    }

    private checkPasswordStrength = (): void => {

        let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        let mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

        if (strongRegex.test(this.editedUser.password)) { this.passwordStrength = PasswordStrengthEnum.STRONG;
        } else if (mediumRegex.test(this.editedUser.password)) { this.passwordStrength = PasswordStrengthEnum.MEDIUM;
        } else { this.passwordStrength = PasswordStrengthEnum.LOW; }
    }

    private checkEqualsPasswords = (): boolean => {
        console.log('checkEqualsPassword', angular.equals(this.editedUser.password, this.editedUser.confirmPassword), '\nfull return: ', Boolean(this.editedUser.password && this.editedUser.confirmPassword.length) && angular.equals(this.editedUser.password, this.editedUser.confirmPassword));
        return  Boolean(this.editedUser.password.length && this.editedUser.confirmPassword.length) &&
                angular.equals(this.editedUser.password, this.editedUser.confirmPassword);
    }

    private save = (): void => {
        console.log('save');
    }

    private discard = (): void => {
        console.log('discard');
        this.editedUser = this.currentUser;
        this.editedUser.password = '';
        this.editedUser.confirmPassword = '';
    }
}

export class Profile implements angular.IComponentOptions {
    public static selector = 'profile';
    public static controller = ProfileController;
    public static controllerAs = 'vm';
    public static template = require('./profile.component.html');
}
