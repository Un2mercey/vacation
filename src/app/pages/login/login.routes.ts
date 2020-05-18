import { Login } from './components/login.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    'ngInject';
    $stateProvider
        .state('login', {
            url: '/login',
            component: Login.selector
        });
};
