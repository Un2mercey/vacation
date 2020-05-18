import { Admin } from './components/admin.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    'ngInject';
    $stateProvider
        .state('admin', {
            url: '/administrator',
            component: Admin.selector
        });
};
