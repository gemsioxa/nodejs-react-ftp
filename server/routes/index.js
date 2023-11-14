const Router = require('express')
const router = new Router()
const connectionRouter = require('./connectionRouter')
const navigationRouter = require('./navigationRouter')
const filesRouter = require('./filesRouter')

router.use('/ftp/connection', connectionRouter)
router.use('/ftp/navigation', navigationRouter)
router.use('/ftp/files', filesRouter)

module.exports = router