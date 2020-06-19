import * as angular from 'angular';
import * as _ from 'underscore';
import { AuthentificationService } from '../../../services/authentification.service';
import { User } from '../../../models/user/user.model';
import { IUserInfoScope } from './../../../models/user/user-info-scope.interface';
import { IUser, IEditedUser } from './../../../models/user/user.interface';
import { PasswordStrengthEnum, checkStrength } from './../../../models/user/password-strength';
import { Messages } from './../../../models/messages/messages';

export class UserInfoDirectiveController {

    private user: User;
    private editedUser: IEditedUser;
    private passwordStrength: PasswordStrengthEnum;
    private Messages = Messages;
    private loginError: boolean = false;

    constructor(
        private auth: AuthentificationService,
        private $scope: IUserInfoScope
    ) {
        'ngInject';
        this.user = this.$scope.user;
    }

    $onInit = (): void => {
        this.discard();
    }

    private checkLogin = (): void => {
        if (Boolean(this.editedUser.login)) {
            this.auth.isFreeLogin(this.editedUser.login)
                .then((response: boolean) => {
                    response ? this.loginError = false : this.loginError = true;
                })
                .catch((error: any) => { console.error(error); });
        }
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
        this.editedUser = this.user.getIUser();
        this.editedUser.password = '';
        this.editedUser.confirmPassword = '';
        this.passwordStrength = null;
    }
}
