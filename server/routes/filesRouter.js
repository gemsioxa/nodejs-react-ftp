const Router = require('express')
const router = new Router()
const filesController = require('../controllers/filesController')

router.post('/create',  filesController.createFolder)
router.post('/delete/folder',  filesController.deleteFolder)
router.post('/delete/file',  filesController.deleteFile)
router.post('/upload', filesController.upload)
router.post('/download', filesController.download)
router.post('/rename', filesController.rename)

module.exports = router