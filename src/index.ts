import 'core-js';
import 'angular';
import '@uirouter/angularjs';
import './index.scss';
import * as angular from 'angular';
import { moduleName as appModule } from './app/app.module';
const bootstrapModuleName = angular.module('application.bootstrap', [appModule]).name;
