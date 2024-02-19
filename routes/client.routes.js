const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

router.post('/client', clientController.createClient);
router.get('/clients', clientController.getAllClients);
router.put('/client/:id', clientController.updateClient);
router.get('/clientdetail/:id', clientController.getClientById);

module.exports = router;