import { AuthentificationService } from './../../services/authentification.service';
import { IUser } from './../../models/user/user.interface';

class ProfileController {

    private currentUser: IUser;
    private newUser: IUser;

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
        this.newUser = this.currentUser;
    }
}

export class Profile implements angular.IComponentOptions {
    public static selector = 'profile';
    public static controller = ProfileController;
    public static controllerAs = 'vm';
    public static template = require('./profile.component.html');
}
