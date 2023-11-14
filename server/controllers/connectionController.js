const ftpService = require("../utils/ftp-service")

class ConnectionController {
    async open(req, res) {
        try {
            ftpService.openConnection(req.body).then(() => {
                return res.json({message: 'ok'})
            })
            .catch((e) => {
                return res.json({message: 'error creating'})
            });
        } catch (e) {
            return res.json({message: 'error creating'})
        }
    }

    async close(req, res) {
        try {
            ftpService.closeConnection();
            return res.json({message: 'ok'})
        } catch (error) {
            return res.json({message: 'error creating'})
        }
    }
}

module.exports = new ConnectionController()