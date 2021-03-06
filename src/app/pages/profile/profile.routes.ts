import { Profile } from './components/profile.component';

export const routing = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
  'ngInject';
  $stateProvider
    .state('profile', {
      url: '/profile',
      component: Profile.selector
    });
};
