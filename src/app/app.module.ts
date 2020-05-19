import * as angular from 'angular';
import { configuration } from './app.configuration';
import { moduleName as coreModule } from './core/core.module';
import { moduleName as loginModule } from './pages/login/login.module';
import { moduleName as adminModule } from './pages/admin/admin.module';

export const moduleName =
  angular.module('application', [
    coreModule,
    loginModule,
    adminModule
  ])
  .config(configuration)
  .name;
