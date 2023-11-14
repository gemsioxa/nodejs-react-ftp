import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8000/', // Configure this properly
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
    maxRedirects: 10
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    return config;
};

const errorInterceptor = (error: AxiosError) => {
    if (!error.response) {
        return Promise.reject(error);
    }

    switch (error.response.status) {
        default:
            break;
    }

    return Promise.reject(error);
};

const responseInterceptor = (response: AxiosResponse) => response;

httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;