import './admin.component.scss';
import * as angular from 'angular';
import * as _ from 'underscore';
import { AuthentificationService } from './../../services/authentification.service';
import { BaseGrid } from './../../models/base-grid/base-grid.model';
import { IUser } from './../../models/user/user.interface';
import { UserTypeEnum } from './../../models/user/user-type.enum';

class AdminController {

    private title: string = 'HELLO, ADMIN';
    private grid: BaseGrid = new BaseGrid();

    constructor(
        private $state: angular.ui.IStateService,
        private auth: AuthentificationService,
        private $timeout: ng.ITimeoutService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        if (this.auth.checkUser()) {
            if (this.auth.checkUserType(UserTypeEnum.ADMINISTRATOR)) {
                this.init();
            } else { this.exit(); }
        } else {
            if (this.auth.checkSessionStorage()) {
                this.auth.restoreUser();
                this.$timeout(() => { this.$onInit(); });
            } else { this.exit(); }
        }
    }

    private init = (): void => {
        this.loadUsersList();
    }

    private loadUsersList = () => {
        this.auth.getUsersList()
            .then((response: Array<IUser>) => {
                this.grid.records = response;
                _.forEach(this.grid.records, (record: IUser) => {
                    record.password = '********';
                });
                console.log('grid records was loaded\n', this.grid.records);
            })
            .catch((error: any) => {
                console.error(`get users error: ${error}`);
            });
    }

    private exit = (): void => {
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
