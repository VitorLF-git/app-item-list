
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');

router.post('/', itemController.postItem);
router.get('/search/:description', itemController.getItemsByDescription);
router.get('/', itemController.getAllItems);

module.exports = router;