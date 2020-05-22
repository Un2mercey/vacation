import * as angular from 'angular';
import * as _ from 'underscore';
import { AuthentificationService } from './../../services/authentification.service';
import { BaseGrid } from './../../models/base-grid/base-grid.model';
import { IUser, IJsonUser } from './../../models/user/user.interface';
import { User } from './../../models/user/user.model';
import { UserTypeEnum } from '../../models/user/user-type.enum';

class AdminController {

    private title: string = 'HELLO, ADMIN';
    private grid: BaseGrid = new BaseGrid();

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
        this.auth.checkUser(UserTypeEnum.ADMINISTRATOR) ? this.init() : this.auth.enter();
    }

    private init = (): void => {
        this.loadUsersList();
    }

    private loadUsersList = () => {
        this.auth.getUsersList()
            .then((response: Array<IJsonUser>) => {
                _.forEach(response, (respUser: IJsonUser) => { this.grid.records.push(new User(respUser)); });
            })
            .catch((error: any) => {
                console.error(`get users error: ${error}`);
            });
    }
}

export class Admin implements angular.IComponentOptions {
    public static selector = 'admin';
    public static controller = AdminController;
    public static controllerAs = 'vm';
    public static template = require('./admin.component.html');
}
