import { AppMenuDirectiveController } from './components/app-menu.component';

export const selector: string = 'appMenu';

export function AppMenuDirective(): ng.IDirective {
    let directive: ng.IDirective = <ng.IDirective>{};
    directive.controller = AppMenuDirectiveController;
    directive.controllerAs = 'vm';
    directive.scope = {};
    directive.template = require('./components/app-menu.component.html');
    return directive;
}
