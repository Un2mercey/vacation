import { Admin } from './components/admin.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    'ngInject';
    $stateProvider
        .state('administrator', {
            url: '/administrator',
            component: Admin.selector
        });
};
