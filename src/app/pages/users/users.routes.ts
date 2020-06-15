import { Users } from './components/users.component';

export const routing = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
  'ngInject';
  $stateProvider
    .state('users', {
        url: '/users',
        component: Users.selector
    });
};
