const express = require('express');
const router = express.Router();
const uploadConfig = require('../configs/multer.config');
const boxController = require('../controllers/boxes.controller');
const boxMiddleware = require('../middleware/boxes.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, boxController.list);
router.get('/:id', secureMiddleware.isAuthenticated, boxMiddleware.checkValidId, boxController.get);
router.post('/', secureMiddleware.isAuthenticated, uploadConfig.single('image'), boxController.create);
router.put('/:id', secureMiddleware.isAuthenticated, uploadConfig.single('image'), boxController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, boxMiddleware.checkValidId, boxController.delete);

module.exports = router;
