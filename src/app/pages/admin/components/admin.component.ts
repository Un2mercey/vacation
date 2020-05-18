import './admin.component.scss';

class AdminController {
    private message: string = null;
    constructor(
        private $state: angular.ui.IStateService
    ) {
        'ngInject';
    }

    $onInit = () => {
        console.log('oninit\nadminController');
        this.message = 'AdminController on init';
    }

}

export class Admin {
    static selector = 'admin';
    static controller = AdminController;
    static controllerAs = 'vm';
    static template = require('./admin.component.html');
}
