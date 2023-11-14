const Router = require('express')
const router = new Router()
const connectionController = require('../controllers/connectionController')

router.post('/open',  connectionController.open)
router.post('/close', connectionController.close)


module.exports = router