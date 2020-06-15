import { Vacation } from './components/vacation.component';

export const routing = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
  'ngInject';
  $stateProvider
    .state('vacation', {
      url: '/vacation',
      component: Vacation.selector
    });
};
