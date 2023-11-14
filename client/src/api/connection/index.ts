import { AxiosResponse } from "axios";
import httpClient from "../../utils/httpClient"
import { ConnectionAPIType, ConnectionResult, OpenConnectionConfig } from "./types";

const openConnection = (config: OpenConnectionConfig): Promise<AxiosResponse<ConnectionResult>> => {
    return httpClient.post<ConnectionResult>('/api/ftp/connection/open/', config);
};

const closeConnection = (): Promise<AxiosResponse<ConnectionResult>> => {
    return httpClient.post<ConnectionResult>('/api/ftp/connection/close/');
};

export default {
    openConnection,
    closeConnection
} as ConnectionAPIType;