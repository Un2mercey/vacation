import * as angular from 'angular';
import * as _ from 'underscore';
import { AuthentificationService } from './../../services/authentification.service';

class AdminController {

    private title: string = 'Welcome to admin control panel';

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
        this.auth.enter();
    }

    $onInit = (): void => {
        console.log('admin component');
    }
}

export class Admin implements angular.IComponentOptions {
    public static selector = 'admin';
    public static controller = AdminController;
    public static controllerAs = 'vm';
    public static template = require('./admin.component.html');
}
