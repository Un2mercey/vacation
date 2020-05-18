import * as angular from 'angular';
import { routing } from './login.routes';
import { Login } from './components/login.component';
// import { serviceName } from './serviceNamePath';

export const moduleName =
  angular.module('application.login', [
      'ui.router'
  ])
  /**
   * Register Module Components
   */
  .component(Login.selector, Login)
  /**
   * Register Module Services
   */
  // .service(serviceName.selector, serviceName)
  /**
   * Register Module Configuration
   */
  .config(routing)
  .name;
