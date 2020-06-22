import * as angular from 'angular';
import { routing } from './login.routes';
import { Login } from './components/login.component';

export const moduleName =
  angular
    .module('app.login', ['ui.router'])
    /**
     * Register Module Components
     */
    .component(Login.selector, Login)
    /**
     * Register Module Routing
     */
    .config(routing)
    .name;
