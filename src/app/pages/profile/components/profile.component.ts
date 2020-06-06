import { AuthentificationService } from './../../services/authentification.service';
import { IUser, IEditedUser } from './../../models/user/user.interface';

class ProfileController {

    private currentUser: IUser;
    private editedUser: IEditedUser;

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        this.currentUser = this.auth.getUser();
        this.discard();
    }

    private save = (): void => {
        console.log('save');
    }

    private discard = (): void => {
        console.log('discard');
        this.editedUser = this.currentUser;
        this.editedUser.password = null;
        this.editedUser.newPassword = null;
    }
}

export class Profile implements angular.IComponentOptions {
    public static selector = 'profile';
    public static controller = ProfileController;
    public static controllerAs = 'vm';
    public static template = require('./profile.component.html');
}
