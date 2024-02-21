const express = require('express');
const router = express.Router();
const ipercController = require('../controllers/iperc.controller');

router.post('/iperc', ipercController.createIPERC);
router.get('/ipercs', ipercController.getAllIPERCs);
router.get('/ipercdetail/:id', ipercController.getIPERCById);
router.put('/iperc/:id', ipercController.updateIPERC);
router.delete('/iperc/:id', ipercController.deleteIPERC);

module.exports = router;