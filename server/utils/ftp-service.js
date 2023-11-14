const ftp = require("basic-ftp");
const fs = require('fs');

const ftpService = () => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    async function openConnection(config) {
        try {
            await client.access({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password
            })
            console.log('Connected to FTP server');
        }
        catch(err) {
            console.log(err)
        }
    }
    
    async function closeConnection() {
        await client.close();

        return 'Connection closed';
    };

    async function getList() {
        const list = await client.list()
            .then((list) => {
                console.log('list:', list);
                return list;
            })
            .catch((err) => {
                return err;
            });

        return list;
    };

    async function goToPath(path) {
        const newPath = await client.cd(path)
            .then((list) => {
                console.log('cd', list);
                return list;
            })
            .catch((err) => {
                console.log('error', err);
                return err;
            });

        return newPath;
    }

    async function getCurrentPath() {
        const current = await client.pwd()
            .then((path) => {
                return path;
            })
            .catch((err) => {
                return err;
            });
        
        return current;
    }

    async function getFileSize(path) {
        const size = await client.size(path)
            .then((size) => {
                return size !== null ? size : 0;
            })
            .catch((err) => {
                return err;
            });

        return size;
    }

    async function createFolder(name) {
        const newFolder = await client.send(`MKD ${name}`)
           .then((response) => {
                return response;
            })
           .catch((err) => {
                return err;
            });

        return newFolder;
    }

    async function deleteFolder(path) {
        const deleted = await client.removeDir(path)
          .then((response) => {
                return response;
            })
          .catch((err) => {
                return err;
            });

        return deleted;
    }

    async function deleteFile(path) {
        const deleted = await client.remove(path)
          .then((response) => {
                return response;
            })
          .catch((err) => {
                return err;
            });

        return deleted;
    }

    async function goToParentPath() {
        const newPath = await client.cdUp()
           .then((response) => {
                return response;
            })
           .catch((err) => {
                return err;
            });

        return newPath;
    }

    async function upload(localPath, remotePath) {
        const uploaded = await client.uploadFrom(localPath, remotePath)
          .then((response) => {
                return response;
            })
          .catch((err) => {
                return err;
            });

        return uploaded;
    }

    async function download(localPath, remotePath) {
        const downloaded = await client.downloadTo(localPath, remotePath)
         .then((response) => {
                return response;
            })
         .catch((err) => {
                return err;
            });

        return downloaded;
    }

    async function rename(oldPath, newPath) {
        const renamed = await client.rename(oldPath, newPath)
        .then((response) => {
                return response;
            })
        .catch((err) => {
                return err;
            });

        return renamed;
    }

    const ftpClientInterface = {
        openConnection,
        closeConnection,
        getList,
        goToPath,
        getCurrentPath,
        getFileSize,
        createFolder,
        deleteFolder,
        deleteFile,
        goToParentPath,
        upload,
        download,
        rename
    }

    return ftpClientInterface; 
};

module.exports = ftpService();