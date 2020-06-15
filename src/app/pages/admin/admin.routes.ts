import { Admin } from './components/admin.component';

export const routing = ($stateProvider: ng.ui.IStateProvider) => {
    'ngInject';
    $stateProvider
        .state('administrator', {
            url: '/admin-control-panel',
            component: Admin.selector
        });
};
