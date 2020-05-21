import * as angular from 'angular';
import { AuthentificationService } from './../../services/authentification.service';
import { UserTypeEnum } from './../../models/user/user-type.enum';

class VacationController {

    private message: string = 'HELLO AVERAGE USER';

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
        if (this.auth.recheck(UserTypeEnum.STANDART)) { this.init(); }
    }

    private init = (): void => {
        console.log('init');
    }
}

export class Vacation implements angular.IComponentOptions {
    public static selector = 'vacation';
    public static controller = VacationController;
    public static controllerAs = 'vm';
    public static template = require('./vacation.component.html');
}
