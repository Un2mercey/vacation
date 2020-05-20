import { Vacation } from './components/vacation.component';

export const routing = ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
  'ngInject';
  $stateProvider
    .state('vacation', {
      url: '/vacation',
      component: Vacation.selector
    });
};
