import './admin.component.scss';
import * as angular from 'angular';
import { UserTypeEnum } from './../../models/user/UserType.model';
import { LocalStorageService } from './../../services/local-storage.service';

class AdminController {

    private message: string = 'HELLO, ADMIN';

    constructor(
        private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private localStorageService: LocalStorageService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        if ((this.$stateParams.user &&  angular.equals(this.$stateParams.user.type, UserTypeEnum.ADMINISTRATOR)) || this.localStorageService.checkStorage(UserTypeEnum.ADMINISTRATOR)) {
            this.localStorageService.pushUser(this.$stateParams.user);
        } else {
            this.$state.go('login');
        }
    }

    public exit = (): void => {
        this.localStorageService.clearStorage();
        this.$state.go('login');
    }

}

export class Admin {
    public static selector = 'admin';
    public static controller = AdminController;
    public static controllerAs = 'vm';
    public static template = require('./admin.component.html');
}
