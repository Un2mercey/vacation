import * as angular from 'angular';
import { Profile } from './components/profile.component';
import { routing  } from './profile.routes';

export const moduleName =
  angular
    .module('app.profile', ['ui.router'])
    /**
     * Register Module Components
     */
    .component(Profile.selector, Profile)
    /**
     * Register Module Routing
     */
    .config(routing)
    .name;
