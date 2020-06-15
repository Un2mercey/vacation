import * as angular from 'angular';
import { AuthentificationService } from './../../services/authentification.service';
import { User } from '../../models/user/user.model';

class ProfileController {

    private user: User;

    constructor(
        private auth: AuthentificationService,
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        this.user = this.auth.getAuthUser();
    }
}

export class Profile implements angular.IComponentOptions {
    public static selector = 'profile';
    public static controller = ProfileController;
    public static controllerAs = 'vm';
    public static template = require('./profile.component.html');
}
