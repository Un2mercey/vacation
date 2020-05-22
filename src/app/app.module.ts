import * as angular from 'angular';
/**
 * Import Application Modules
 */
import { moduleName as coreModule } from './core/core.module';
import { moduleName as loginModule } from './pages/login/login.module';
import { moduleName as adminModule } from './pages/admin/admin.module';
import { moduleName as vacationModule } from './pages/vacation/vacation.module';
import { moduleName as profileModule } from './pages/profile/profile.module';
/**
 * Import Application Services
 */
import { LocalStorageService } from './pages/services/local-storage.service';
import { SessionStorageService } from './pages/services/session-storage.service';
import { AuthentificationService } from './pages/services/authentification.service';
/**
 * Import Application Directives
 */
import { AppMenuDirective, selector as AppMenuDirectiveSelector } from './pages/directives/app-menu/app-menu.directive';

export const moduleName =
  angular.module('application', [
    coreModule,
    loginModule,
    adminModule,
    vacationModule,
    profileModule
  ])
  /**
   * Register Application Services
   */
  .service(LocalStorageService.selector, LocalStorageService)
  .service(SessionStorageService.selector, SessionStorageService)
  .service(AuthentificationService.selector, AuthentificationService)
  /**
   * Register Application Directives
   */
  .directive(AppMenuDirectiveSelector, AppMenuDirective)
  .name;
