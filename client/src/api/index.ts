import ConnectionAPI from './connection';
import NavigationAPI from './navigation';
import FilesAPI from './files';

import { ConnectionAPIType } from './connection/types';
import { NavigationAPIType } from './navigation/types';
import { FilesAPIType } from './files/types';

export type APIType = {
    connection: ConnectionAPIType;
    navigation: NavigationAPIType;
    files: FilesAPIType;
}

export default {
    connection: ConnectionAPI,
    navigation: NavigationAPI,
    files: FilesAPI
} as APIType;