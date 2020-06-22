import * as angular from 'angular';
import { Root } from './components/root.component';
import { configLocation, configRoot } from './core.configuration';
import { routing } from './core.routes';

export const moduleName =
  angular
    .module('app.core', ['ui.router'])
    /**
     * Register Module Components
     */
    .component(Root.selector, Root)
    /**
     * Register Module Config
     */
    .config(configLocation)
    .config(configRoot)
    /**
     * Register Module Routing
     */
    .config(routing)
    .name;
