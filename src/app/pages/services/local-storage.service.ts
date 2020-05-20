export class LocalStorageService {

    public static selector = 'lsService';

    public getItem = (key: string): string => {
        return localStorage.getItem(key);
    }

    public setItem = (key: string, value: string): void => {
        localStorage.setItem(key, value);
    }

    public clearStorage = (): void => {
        localStorage.clear();
    }
}
