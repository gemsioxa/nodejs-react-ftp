import { AxiosResponse } from 'axios';
import httpClient from '../../utils/httpClient';
import { NavigationAPIType, NavigationGetElements } from './types';

const goToPath = (path: string): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/navigation/cd', {
        path: path
    });
};

const goToParentPath = (): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/navigation/up');
};

const getElements = (): Promise<AxiosResponse<NavigationGetElements>> => {
    return httpClient.get<NavigationGetElements>('/api/ftp/navigation/ls');
};

const getSize = (): Promise<AxiosResponse<number>> => {
    return httpClient.get<number>('/api/ftp/navigation/size');
};

export default {
    goToPath,
    goToParentPath,
    getElements,
    getSize
} as NavigationAPIType;