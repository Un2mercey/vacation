import * as angular from 'angular';
import * as _ from 'underscore';
import { AuthentificationService } from './../../services/authentification.service';
import { BaseGrid } from './../../models/base-grid/base-grid.model';
import { IUser } from './../../models/user/user.interface';
import { UserTypeEnum } from './../../models/user/user-type.enum';
import { User } from './../../models/user/user.model';

class AdminController {

    private title: string = 'HELLO, ADMIN';
    private grid: BaseGrid = new BaseGrid();

    constructor(
        private $state: angular.ui.IStateService,
        private auth: AuthentificationService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        this.auth.checkUser(UserTypeEnum.ADMINISTRATOR) ? this.init() : this.exit();
    }

    private init = (): void => {
        this.loadUsersList();
    }

    private loadUsersList = () => {
        this.auth.getUsersList()
            .then((response: Array<IUser>) => {
                _.forEach(response, (respUser: IUser) => { this.grid.records.push(new User(respUser)); });
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
