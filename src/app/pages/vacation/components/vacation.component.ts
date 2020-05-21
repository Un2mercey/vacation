import './vacation.component.scss';
import * as angular from 'angular';
import { AuthentificationService } from './../../services/authentification.service';
import { UserTypeEnum } from './../../models/user/user-type.enum';

class VacationController {

    private message: string = 'HELLO AVERAGE USER';

    constructor(
        private $state: angular.ui.IStateService,
        private auth: AuthentificationService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        this.auth.checkUser(UserTypeEnum.STANDART) ? this.init() : this.exit();
    }

    public init = () => {
        console.log('init');
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
