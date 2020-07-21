export class SomeModalController {

    constructor(
        private $uibModalInstance: angular.ui.bootstrap.IModalInstanceService
    ) {
        'ngInject';
    }

    private close = (): void => {
        this.$uibModalInstance.close();
    }
}
