import 'core-js';
import 'angular';
import '@uirouter/angularjs';
import './index.scss';
import * as angular from 'angular';
import { moduleName as appModule } from './app/app.module';

export const savedUsers = require('./static/users.json');

const bootstrapModuleName = angular.module('application.bootstrap', [appModule]).name;
