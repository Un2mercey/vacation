import * as angular from 'angular';
import * as _ from 'underscore';
import { Messages } from './../../models/messages/messages';
import { AuthentificationService } from './../../services/authentification.service';
import { IUser } from './../../models/user/user.interface';
import { SomeModalController } from './../../modals/some-modal/someModalController';

class LoginController {

    private newUser: IUser = { login: '', password: ''};
    private authError: boolean = false;
    private messages = Messages;

    constructor(
        private $rootScope: ng.IRootScopeService,
        private auth: AuthentificationService,
        private $uibModal: ng.ui.bootstrap.IModalService
    ) {
        if (this.auth.checkUser()) { this.auth.enter(); }
        this.$rootScope.$watch(() => { return this.newUser.login; }, (newValue, oldValue) => { this.authError = false; });
        this.$rootScope.$watch(() => { return this.newUser.password; }, (newValue, oldValue) => { this.authError = false; });
    }

    private openModal = (): void => {
        console.log('function');
        this.$uibModal.open({
            template: require('./../../modals/some-modal/some-modal.html'),
            controller: SomeModalController,
            controllerAs: 'vm'
        })
            .result
            .then((val: any) => console.log(val))
            .catch((err: any) => console.log(err))
            .finally(() => console.log('finally'));
    }

    private checkAuth = (newUser: IUser): void => {
        this.authError = false;
        this.auth.searchUser(newUser)
            .then((response: IUser) => {
                this.auth.checkUndefined(response) ? this.auth.enter() : this.authError = true;
            })
            .catch((error: any) => { this.authError = true; });
    }
}

export class Login implements angular.IComponentOptions {
    public static selector = 'login';
    public static controller = LoginController;
    public static controllerAs = 'vm';
    public static template = require('./login.component.html');
}
