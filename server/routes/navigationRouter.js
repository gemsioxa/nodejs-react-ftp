const Router = require('express')
const router = new Router()
const navigationController = require('../controllers/navigationController')

router.post('/cd',  navigationController.goToPath)
router.post('/up', navigationController.goToParentPath)
router.get('/ls', navigationController.getElements)
router.get('/size', navigationController.getSize)


module.exports = router