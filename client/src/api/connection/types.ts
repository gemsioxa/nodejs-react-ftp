import { AxiosResponse } from "axios";

export type OpenConnectionConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
}

export type ConnectionResult = {
    message: string;
}


export type ConnectionAPIType = {
    openConnection: (config: OpenConnectionConfig) => Promise<AxiosResponse<ConnectionResult>>;
    closeConnection: () => Promise<AxiosResponse<ConnectionResult>>;
}