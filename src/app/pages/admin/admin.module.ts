import * as angular from 'angular';
import { Admin } from './components/admin.component';
import { routing } from './admin.routes';

export const moduleName =
  angular
    .module('application.admin', ['ui.router'])
    .component(Admin.selector, Admin)
    .config(routing)
    .name;
