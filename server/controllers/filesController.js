const ftpService = require("../utils/ftp-service")

class FilesController {
    async createFolder(req, res) {
        try {
            ftpService.createFolder(req.body.name)
                .then(() => {
                    return res.json({message: 'ok'})
                })
                .catch((e) => {
                    return res.json({message: 'error creating'})
                });
        } catch (e) {
            return res.json({message: 'error creating'})
        }
    }

    async deleteFolder(req, res) {
        try {
            ftpService.deleteFolder(req.body.path)
                .then((resp) => {
                    return res.json({message: 'ok', data: resp})
                })
                .catch((e) => {
                    return res.json({message: 'error creating'})
                });
        } catch (e) {
            return res.json({message: 'error creating'})
        }
    }

    async deleteFile(req, res) {
        try {
            ftpService.deleteFile(req.body.path)
                .then((resp) => {
                    return res.json({message: 'ok', data: resp})
                })
                .catch((e) => {
                    return res.json({message: 'error creating'})
                });
        } catch (e) {
            return res.json({message: 'error creating'})
        }
    }

    async upload(req, res) {
        try {
            ftpService.upload(req.body.localPath, req.body.remotePath)
               .then((resp) => {
                    return res.json({message: 'ok', data: resp})
                })
               .catch((e) => {
                    return res.json({message: 'error creating'})
                });
        } catch (error) {
            return res.json({message: 'error creating'})
        }
    }

    async download(req, res) {
        const localPath = `./Downloads/${req.body.remotePath}`;
        try {
            ftpService.download(localPath, req.body.remotePath)
              .then((resp) => {
                    return res.json({message: 'ok', data: resp})
                })
              .catch((e) => {
                    return res.json({message: 'error creating'})
                });
        } catch (error) {
            
        }
    }

    async rename(req, res) {
        try {
            ftpService.rename(req.body.oldPath, req.body.newPath)
              .then((resp) => {
                    return res.json({message: 'ok', data: resp})
                })
              .catch((e) => {
                    return res.json({message: 'error creating'})
                });
        } catch (error) {
            return res.json({message: 'error creating'})
        }
    }
}

module.exports = new FilesController()