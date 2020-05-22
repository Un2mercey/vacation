import { Profile } from './components/profile.component';

export const routing = ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
  'ngInject';
  $stateProvider
    .state('profile', {
      url: '/profile',
      component: Profile.selector
    });
};
