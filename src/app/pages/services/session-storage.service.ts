export class SessionStorageService {

    public static selector = 'ssService';

    public getItem = (key: string): string => {
        return sessionStorage.getItem(key);
    }

    public setItem = (key: string, value: string): void => {
        sessionStorage.setItem(key, value);
    }

    public clearStorage = (): void => {
        sessionStorage.clear();
    }
}
