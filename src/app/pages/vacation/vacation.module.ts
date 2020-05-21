import * as angular from 'angular';
import { Vacation } from './components/vacation.component';
import { routing  } from './vacation.routes';

export const moduleName =
  angular
    .module('application.vacation', ['ui.router'])
    /**
     * Register Module Components
     */
    .component(Vacation.selector, Vacation)
    /**
     * Register Module Routing
     */
    .config(routing)
    .name;
