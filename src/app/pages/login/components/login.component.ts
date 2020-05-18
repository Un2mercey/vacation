import './login.component.scss';

class LoginController {
    public message: string = null;

    constructor(
        private $state: angular.ui.IStateService
    ) {
        'ngInject';
    }

    $onInit = () => {
        console.log('oninit');
        this.getMessage();
        this.setMessage();
        this.getMessage();
    }

    private getMessage = () => {
        console.log('GetMessage\nmessage = ', this.message);
    }

    private setMessage = () => {
        this.message = 'Hello World';
    }

}

export class Login implements angular.IComponentOptions {
    static selector = 'login';
    static controller = LoginController;
    static controllerAs = 'vm';
    static template = require('./login.component.html');
}
