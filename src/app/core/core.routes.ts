import { App } from './components/app/app.component';

export const routing = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
  'ngInject';
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      component: App.selector
    });

    $urlRouterProvider.otherwise('/login');
};
