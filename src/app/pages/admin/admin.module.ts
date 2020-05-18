import * as angular from 'angular';
import { Admin } from './components/admin.component';
import { routing } from './admin.routes';

export const moduleName =
  angular.module('application.admin', [
      'ui.router'
  ])
  /**
   * Register Module Components
   */
  .component(Admin.selector, Admin)
  /**
   * Register Module Services
   */
  // .service(serviceName.selector, serviceName)
  /**
   * Register Module Configuration
   */
  .config(routing)
  .name;
