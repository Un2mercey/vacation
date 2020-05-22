import { AuthentificationService } from './../../../services/authentification.service';

export class AppMenuDirectiveController {

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
    }
}
