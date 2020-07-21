import * as angular from 'angular';
import { Users } from './components/users.component';
import { routing  } from './users.routes';

export const moduleName =
  angular
    .module('app.users', ['ui.router'])
    /**
     * Register Module Components
     */
    .component(Users.selector, Users)
    /**
     * Register Module Routing
     */
    .config(routing)
    .name;
