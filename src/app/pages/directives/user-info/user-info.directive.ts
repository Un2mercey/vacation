import { UserInfoDirectiveController } from './components/user-info.component';

export const selector: string = 'userInfo';

export function UserInfoDirective(): ng.IDirective {
    let directive: ng.IDirective = <ng.IDirective>{};
    directive.controller = UserInfoDirectiveController;
    directive.controllerAs = 'vm';
    directive.scope = {
      user: '=',
      visible: '='
    };
    directive.template = require('./components/user-info.component.html');
    return directive;
}
