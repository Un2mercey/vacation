import './admin.component.scss';
import * as angular from 'angular';
import { AuthentificationService } from '../../services/authentification.service';

class AdminController {

    private message: string = 'HELLO, ADMIN';

    constructor(
        private $state: angular.ui.IStateService,
        private auth: AuthentificationService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        if (this.auth.checkUser()) {
            console.log(this.auth.getUser());
        } else {
            this.exit();
        }
    }

    public exit = (): void => {
        this.auth.clearUser();
        this.$state.go('login');
    }

}

export class Admin implements angular.IComponentOptions {
    public static selector = 'admin';
    public static controller = AdminController;
    public static controllerAs = 'vm';
    public static template = require('./admin.component.html');
}
