import './vacation.component.scss';
import * as angular from 'angular';
import { IUser } from '../../models/user/user.model';
import { AuthentificationService } from '../../services/authentification.service';

class VacationController {

    private message: string = 'HELLO AVERAGE USER';
    private user: IUser;

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

export class Vacation implements angular.IComponentOptions {
    public static selector = 'vacation';
    public static controller = VacationController;
    public static controllerAs = 'vm';
    public static template = require('./vacation.component.html');
}
