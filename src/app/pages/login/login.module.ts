import * as angular from 'angular';
import { routing } from './login.routes';
import { Login } from './components/login.component';

export const moduleName =
  angular
    .module('application.login', ['ui.router'])
    .component(Login.selector, Login)
    .config(routing)
    .name;
