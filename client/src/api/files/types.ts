import { AxiosResponse } from "axios";


export type FilesAPIType = {
    createFolder: (name: string) => Promise<AxiosResponse<string>>;
    deleteFolder: (path: string) => Promise<AxiosResponse<string>>;
    deleteFile: (path: string) => Promise<AxiosResponse<string>>;
    uploadFile: (path: string, file: string) => Promise<AxiosResponse<string>>;
    downloadFile: (path: string) => Promise<AxiosResponse<string>>;
    renameFile: (oldPath: string, newPath: string) => Promise<AxiosResponse<string>>;
}