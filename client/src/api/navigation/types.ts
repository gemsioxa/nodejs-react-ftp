import { AxiosResponse } from "axios";
import { FileInfo } from "basic-ftp";

export type NavigationGetElements = {
    message: string;
    elements: Array<FileInfo>;
    code: string;
}

export type NavigationPath = {
    message: string;
    data: { code: number; message: string };
    code: string | number;
}
export type NavigationAPIType = {
    goToPath: (path: string) => Promise<AxiosResponse<NavigationPath>>;
    goToParentPath: () => Promise<AxiosResponse<NavigationPath>>;
    getElements: () => Promise<AxiosResponse<NavigationGetElements>>;
    getSize: () => Promise<AxiosResponse<number>>;
}