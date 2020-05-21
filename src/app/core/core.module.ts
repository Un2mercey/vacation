import * as angular from 'angular';
import { App } from './components/app/app.component';
import { Root } from './components/root/root.component';
import { configLocation, configRoot } from './core.configuration';
import { routing } from './core.routes';

export const moduleName =
  angular
    .module('application.core', ['ui.router'])
    /**
     * Register Module Components
     */
    .component(App.selector, App)
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
