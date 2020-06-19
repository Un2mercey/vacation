import { IJsonUser } from './../models/user/user.interface';

export class UsersApiService {

    public static selector: string = 'usersApiService';

    constructor(
        private $q: ng.IQService,
        private $http: ng.IHttpService
    ) {
        'ngInject';
    }

    public getUsersJson = (): ng.IPromise<any> => {
        let config = <ng.IRequestConfig>{
            url: '/getUsers.api',
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            transformRequest: null
        };
        let deferred = this.$q.defer();
        this.$http(config)
            .then((response: any) => {
                deferred.resolve(response);
            })
            .catch((error: any) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    public writeUsersJson = (requestParams: Array<IJsonUser>): ng.IPromise<any> => {
        let config = <ng.IRequestConfig>{
            url: '/writeNewUser.api',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(requestParams),
            method: 'POST',
            transformRequest: null
        };
        let deferred = this.$q.defer();
        this.$http(config)
            .then((response: any) => {
                deferred.resolve(response);
            })
            .catch((error: any) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }
}
