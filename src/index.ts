import 'core-js';
import 'angular';
import 'ui-bootstrap4';
import '@uirouter/angularjs';
import './app/themes/theme.scss';
import * as angular from 'angular';
import { moduleName as appModule } from './app/app.module';

const bootstrapModuleName = angular.module('app.bootstrap', [appModule, 'ui.bootstrap']).name;
