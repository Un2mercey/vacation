import { AuthentificationService } from './../../../services/authentification.service';

export class AppMenuDirectiveController {

    public message = 'this is AppMenuDirective';

    constructor(
        private auth: AuthentificationService
    ) {
        'ngInject';
    }

    public quit = (): void => {
        this.auth.exit();
    }
}
