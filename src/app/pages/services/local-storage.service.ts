export class LocalStorageService {

    public static selector = 'lsService';

    public clearStorage = (): void => {
        localStorage.clear();
    }

    public getItem = (key: string): string => {
        return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }

    public setItem = (key: string, value: string): void => {
        localStorage.setItem(key, value);
    }
}
