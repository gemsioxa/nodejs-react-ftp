import { AxiosResponse } from "axios";
import httpClient from "../../utils/httpClient"
import { FilesAPIType } from "./types";

const createFolder = (name: string): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/files/create/', {
        name: name
    });
};

const deleteFolder = (path: string): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/files/delete/folder', {
        path: path
    });
}

const deleteFile = (path: string): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/files/delete/file', {
        path: path
    });
}

const uploadFile = (localPath: string, remotePath: string): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/files/upload', {
        localPath: localPath,
        remotePath: remotePath
    });
}

const downloadFile = (path: string): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/files/download', {
        remotePath: path
    });
}

const renameFile = (oldPath: string, newPath: string): Promise<AxiosResponse<string>> => {
    return httpClient.post<string>('/api/ftp/files/rename', {
        oldPath: oldPath,
        newPath: newPath
    });
}

export default {
    createFolder,
    deleteFolder,
    deleteFile,
    uploadFile,
    downloadFile,
    renameFile
} as FilesAPIType;