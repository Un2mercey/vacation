import * as angular from 'angular';
import * as _ from 'underscore';
import { AuthentificationService } from './../../services/authentification.service';
import { UserTypeEnum } from './../../models/user/user-type.enum';
import { BaseGrid } from './../../models/base-grid/base-grid.model';
import { IJsonUser } from './../../models/user/user.interface';
import { User } from './../../models/user/user.model';

class UsersController {

    private grid: BaseGrid = new BaseGrid();

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
    }

    $onInit = (): void => {
        if (this.auth.checkUserType(UserTypeEnum.ADMINISTRATOR)) {
            this.loadUsersList();
        } else { this.auth.enter(); }
    }

    private loadUsersList = () => {
        if (this.auth.getUsersList() !== undefined) {
            this.auth.getUsersList()
                .then((response: Array<IJsonUser>) => {
                    _.forEach(response, (respUser: IJsonUser) => {
                        this.grid.records.push({
                            user: new User(respUser),
                            visible: false
                        });
                    });
                })
                .catch((error: any) => {
                    console.error(`get users error: ${error}`);
                });
        }
    }

    private changeVisibleRow = (row: {user: User, visible: boolean}): void => {
        if (row.visible) {
            this.setAllRowsInvisible();
        } else {
            this.setAllRowsInvisible();
            row.visible = true;
        }
    }

    private setAllRowsInvisible = (): void => {
        _.forEach(this.grid.records, (record: {user: User, visible: boolean}) => {
            record.visible = false;
        });
    }
}

export class Users implements angular.IComponentOptions {
    public static selector = 'users';
    public static controller = UsersController;
    public static controllerAs = 'vm';
    public static template = require('./users.component.html');
}
