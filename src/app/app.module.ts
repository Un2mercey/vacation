import * as angular from 'angular';
import { moduleName as coreModule } from './core/core.module';
import { moduleName as loginModule } from './pages/login/login.module';
import { moduleName as adminModule } from './pages/admin/admin.module';
import { moduleName as vacationModule } from './pages/vacation/vacation.module';
import { LocalStorageService } from './pages/services/local-storage.service';
import { SessionStorageService } from './pages/services/session-storage.service';
import { AuthentificationService } from './pages/services/authentification.service';

export const moduleName =
  angular.module('application', [
    coreModule,
    loginModule,
    adminModule,
    vacationModule
  ])
  .service(LocalStorageService.selector, LocalStorageService)
  .service(SessionStorageService.selector, SessionStorageService)
  .service(AuthentificationService.selector, AuthentificationService)
  .name;
