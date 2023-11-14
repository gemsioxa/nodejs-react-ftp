const ftpService = require("../utils/ftp-service")

class NavigationController {
    async goToPath(req, res) {
        try {
            ftpService.goToPath(req.body.path)
                .then(data => {
                    return res.json({message:'success going to path', data: data, code: data.code})
                })
                .catch ((e) => {
                    return res.json({message: 'error going to path'})
                })
        } catch (e) {
            return res.json({message: 'error going to path'})
        }
    }

    async goToParentPath(req, res) {
        try {
            ftpService.goToParentPath()
               .then(data => {
                    return res.json({message:'success going to parent path'})
                })
               .catch ((e) => {
                    return res.json({message: 'error going to parent path'})
                })
        } catch (e) {
            return res.json({message: 'error going to parent path'})
        }
    }

    async getElements(req, res) {
        try {
            // return res.json({message:'success getting all elements'})
            ftpService.getList()
            .then(data => {
                console.log(data);
                return res.json({message: 'success getting all elements', elements: data, code: data.code})
            })
        } catch (e) {
            return res.json({message: 'error getting all elements'})
        }
    }

    async getSize(req, res) {    
        try {
            ftpService.getFileSize(req.body.path).then(data => {
                console.log('get all')
                
                return res.json({message:'success getting size', data: data})
            })
        } catch (error) {
            return res.json({message: 'error getting all comments'})
        }
    }
}

module.exports = new NavigationController()