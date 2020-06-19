import * as angular from 'angular';
import { AuthentificationService } from './../../services/authentification.service';

class VacationController {

    private message: string = 'welcome to application home page';

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
        this.auth.enter();
    }

    $onInit = (): void => {
        console.log('onInit vacation');
    }
}

export class Vacation implements angular.IComponentOptions {
    public static selector = 'vacation';
    public static controller = VacationController;
    public static controllerAs = 'vm';
    public static template = require('./vacation.component.html');
}
